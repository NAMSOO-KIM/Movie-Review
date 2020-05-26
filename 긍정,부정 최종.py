import requests
from bs4 import BeautifulSoup
from time import sleep
import pandas as pd
import os
from urllib import parse
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score
import pickle
from konlpy.tag import *
import pymysql.cursors


#네이버 영화 메인 페이지 1~10위 영화 상세페이지 주소 가져오기
def step1_get_detail_url() :
    # 접속할 페이지의 주소
    site = 'https://movie.naver.com/movie/running/current.nhn?order=reserve'

    # 접속한다.
    response = requests.get(site)   

    bs = BeautifulSoup(response.content, 'html.parser')
    #print(bs)

    # a 태그들을 가져온다.
    a_list = bs.select('.top_thumb_lst a')

    # href 속성을 가져온다.
    df = pd.DataFrame()
    for idx in range(10) :       # 상위 20개만 가져오기
        href = a_list[idx].get('href')
        
        # 가져온 href 속성의 주소를 분석한 객체를 생성한다.
        a1 = parse.urlparse(href)
        
        # 주소를 분석한 객체서 쿼리 스트링을 가져온다
        query_str = parse.parse_qs(a1.query)
        
        # 추출한 쿼리스트링 데이터에서 원하는 파라미터 데이터를 추출한다.
        code = query_str['code'][0]
        

        # print(href)
        df = df.append([[code]], ignore_index=True)

    df.columns = ['code']
    return df

def step2_get_reple_href(code_frame) :
    # 스크랩한 영화 코드를 불러온다.
    code_list = code_frame['code'].tolist()

    # 테스트용
 #   code_list = ['156464', '109906']


    # 영화코드와 주소를 합쳐서 요청할 주소를 만든다.
    url_list = pd.DataFrame()
    for code in code_list:
        site = 'https://movie.naver.com/movie/bi/mi/pointWriteFormList.nhn?code=%s&type=after&isActualPointWriteExecute=false&isMileageSubscriptionAlready=false&isMileageSubscriptionReject=false' % code
        # print(site)
        url_list = url_list.append([[site]], ignore_index=True)

    url_list.columns = ['url']
    return url_list

def step3_get_reply_data(df) :
    # csv에 저장되어 있는 url 데이터를 가져온다.
    url_list = df['url'].tolist()
    i=1 #영화 순위 카운팅
    result_df = pd.DataFrame()
    
    for url in url_list :
        print(url)
        # 해당 영화의 첫 페이지 html 데이터를 가져온다. (총 몇건의 리뷰가 있는지 확인해서 "페이지수"를 계산하기 위함)
        response = requests.get(url)
        bs = BeautifulSoup(response.content, 'html.parser')
        # print(bs)

        # 총 페이지 수를 구한다.
        strong = bs.select('.total em')
        #1->0
        score_total = int(strong[0].text.replace(',', ''))    # 쉼표 없애기 / int(정수형)로 만들기
        # print(score_total)
        pageCnt = score_total // 10     # 한페이지당 10개의 리뷰가 있어서
        if score_total % 10 > 0 :
            pageCnt += 1
        print(pageCnt)

        # 전체 페이지를 돌면서 140평 데이터를 가져온다.
        # 현재 페이지
        now_page = 1

        pageCnt = 5        # 테스트로 5페이지까지만
        
        while now_page <= pageCnt :
            #sleep(1)
            #sleep(0.0001)
            # 요청할 페이지의 주소
            url2 = url + '&page=' + str(now_page)
            # print(url2)

            # 140자평 데이터를 추출한다.
            response2 = requests.get(url2)
            bs2 = BeautifulSoup(response2.content, 'html.parser')

#             result_df = pd.DataFrame()

            # li 태그들을 가져온다.(score_reple 태그-리뷰-를 포함하고 있는)
            lis = bs2.select('.score_result li')

            for obj in lis :
        
                # 평점
                star_score = obj.select('.star_score em')[0].text
                # 140자평
                score_reple = obj.select('.score_reple p')[0].text
                # 아이디
                reviewer = obj.select('.score_reple em')[0].text
                # 날짜
                date = obj.select('.score_reple em')[1].text            

                result_df = result_df.append([[score_reple, star_score, reviewer, date, i]], ignore_index=True)
                
            print("%d / %d" % (now_page, pageCnt))               # 진행경과를 보여준다. n번째 중 몇 번째 진행중인지.
            now_page += 1
        i=i+1 #movie_id 값 1증가
    result_df.columns = ['text', 'score','reviewer', 'date', 'movie_id']
    print('저장완료')
    return result_df

#전처리 함수
def prepro(df): 
    df.columns = ["리뷰","평점","작성자","날짜","movie_id"]

    df['리뷰']=df['리뷰'].str.replace(pat='관람객', repl='', regex=False)
    df[df['리뷰'].str.contains("스포일러가 포함된 감상평입니다. 감상평 보기")]= np.nan #nan으로 변경
    df['리뷰']= df['리뷰'].str.strip()  # 앞 뒤 공백을 제거
    df['작성자']= df['작성자'].str.strip()  

    df=df.replace('',np.NaN)
    result=df.dropna()    
#     df.dropna()
    final_result=result.reset_index(drop=True)
    return final_result

# 형태소 분석을 위한 함수
def tokenizer(text) :
    okt = Okt()
    return okt.morphs(text)

def step7_insert_review(df) :
    # 객체를 복원한다.
    with open('pipe.dat', 'rb') as fp:
        pipe = pickle.load(fp)

    import numpy as np
    import pandas as pd
    
    
    rlist=df["리뷰"].tolist()
    df=df.drop("리뷰",axis=1) 
    df_result = pd.DataFrame()
    
    for i in rlist :
        text = i

        str = [text]
        # 예측 정확도
        r1 = np.max(pipe.predict_proba(str) * 100)
        # 예측 결과
        r2 = pipe.predict(str)[0]

        if r2 == '1' :
            print(text)
            
            print('긍정적인 리뷰')
            df_result = df_result.append([[text, r1, r2]],ignore_index=True)
            print('----------------------------')
        else :
            print(text)
            print('부정적인 리뷰')
            df_result = df_result.append([[text, r1, r2]],ignore_index=True)
            print('----------------------------')

        print('정확도 : %.3f' % r1)
    
    df_result.columns = ['리뷰','정확도','결과']
    final_result=pd.concat([df_result,df],axis=1)
    return final_result


def df_to_list(final_result):
    review=final_result['리뷰'].tolist()
    accuracy=final_result['정확도'].tolist()
    result=final_result['결과'].tolist()
    # score=final_result['평점'].tolist()
    reviewer=final_result['작성자'].tolist()
    date=final_result['날짜'].tolist()
    movie_id=final_result['movie_id'].tolist()
    return review, accuracy, result, reviewer, date, movie_id

def db_connect(final_result):
    review, accuracy, result, reviewer, date, movie_id = df_to_list(final_result)

    conn = pymysql.connect( #DB연결
    host='localhost',
    user='root',
    password='1234',
    db='movie_review',
    charset='utf8' 
    )
    total = len(review) #리뷰 개수
    curs = conn.cursor()
    sql = "insert into reviews(review_id, review_movie_id, review_contents, review_accuracy, review_result, review_reviewer, review_date) values(%s,%s,%s,%s,%s,%s,%s)"
    for i in range(total):
        curs.execute(sql, (i+1 ,movie_id[i], review[i], accuracy[i], result[i], reviewer[i], date[i]))
        print('ok')    
        conn.commit()

def start():
    df=step1_get_detail_url()
    url_list=step2_get_reple_href(df)
    df=step3_get_reply_data(url_list)
    df= prepro(df)
    final_result = step7_insert_review(df)
    db_connect(final_result)    



if __name__ == "__main__":
    start()
