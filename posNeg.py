import requests
from bs4 import BeautifulSoup
from time import sleep
import pandas as pd
import os
from urllib import parse
import numpy as np
import pymysql.cursors
from operator import eq
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score
import pickle
from konlpy.tag import *
import sister



#대중 리뷰
from sklearn.ensemble import IsolationForest
import matplotlib.pyplot as plt

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
#     df.to_csv('movie_code_list.csv', index=False, encoding='utf-8-sig')
#     print('주소 저장 완료')

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
#     url_list.to_csv('movie_url_list.csv', index=False, encoding='utf-8-sig')
    return url_list

from operator import eq

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
#         now_page = 1
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

            

            # li 태그들을 가져온다.(score_reple 태그-리뷰-를 포함하고 있는)
            lis = bs2.select('.score_result li')

            for obj in lis :
                
                # 평점
                star_score = obj.select('.star_score em')[0].text
                
                # 140자평
                score_reple = obj.select('.score_reple p')[0].text
                score_reple = score_reple.strip() # 추가
                # 아이디
                reviewer = obj.select('.score_reple span')[-1].text
                reviewer = reviewer.strip() # 추가
                
                if eq(score_reple,reviewer ):
                    continue
#                 eq(score_reple,reviewer)

#                 print(score_reple==reviewer)
                
                    
                # 날짜
                date = obj.select('.score_reple em')[-2].text
                
#                 date = obj.select('.score_reple')[0].text
#                 print(star_score)
#                 print(score_reple)
#                 print(reviewer)
                
#                 print(len(score_reple))
#                 print(len(reviewer))
#                 print(type(score_reple))
#                 print(type(reviewer))
#                 print(date)

                # 저장한다.
                result_df = result_df.append([[score_reple, star_score, reviewer, date, i]], ignore_index=True)
#                 result_df = result_df.append([[score_reple, star_score,reviewer, date, i]], ignore_index=True)
#             result_df.columns = ['text', 'score','reviewer', 'date', 'movie_id']
#             print(result_df)

#             if os.path.exists('star_score.csv') == False :     # 아직 파일이 없으면 파일을 만든다.
#                 result_df.columns = ['text', 'score']
#                 result_df.to_csv('star_score.csv', index=False, encoding='utf-8-sig')
#             else :                                               # 이미 파일이 있으면 결과를 더한다.
#                 result_df.to_csv('star_score.csv', index=False, encoding='utf-8-sig', mode='a', header=False)
                
            print("%d / %d" % (now_page, pageCnt))               # 진행경과를 보여준다. n번째 중 몇 번째 진행중인지.
            now_page += 1
        i=i+1 #movie_id 값 1증가
    result_df.columns = ['text', 'score','reviewer', 'date', 'movie_id']
    print('저장완료')
    return result_df

def prepro(df): 
    df.columns = ["리뷰","평점","작성자","날짜","movie_id"]

    df['리뷰']=df['리뷰'].str.replace(pat='관람객', repl='', regex=False)
    df[df['리뷰'].str.contains("스포일러가 포함된 감상평입니다. 감상평 보기")]= np.nan #nan으로 변경
    df['리뷰']= df['리뷰'].str.strip()  # 앞 뒤 공백을 제거
    df['작성자']= df['작성자'].str.strip()  # 앞 뒤 공백을 제거

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

def review_embedding(df): #각 영화 리뷰를 100차원의 값으로 임베딩
    review_list=df['리뷰'].tolist()
    vector1_list = []
    sentence_embedding = sister.MeanEmbedding(lang="file",fasttextfile="cc.ko.100.bin")
    for i in range(len(review_list)): 
    
        s1 = sentence_embedding(review_list[i])
        vector1_list.append(s1)
        
    vector_df= pd.DataFrame(vector1_list) #DataFrame으로
    return vector_df #merge

def model(X):
    ifor = IsolationForest(n_estimators=100, max_samples=512,contamination=0.0235).fit(X) #모델 생성  
    return ifor

def index(score,value): #Outlit score 최소인 20개 리뷰 확인
    index = []
    score=score.tolist()
    for j in range(10): #10개 추출
        find_index=score.index(value[j])
        index.append(find_index)
    return index

def labeling(df,ind):
    for x in ind:
        df['clustering'][x]=1
    return df

def separ(df):
    a = list()
    
    mv_1 = df['movie_id'] == 1
    mv1 = df[mv_1]
    
    mv_2 = df['movie_id'] == 2
    mv2 = df[mv_2]
    mv2.reset_index(drop=True, inplace=True)
    
    mv_3 = df['movie_id'] == 3
    mv3 = df[mv_3]
    mv3.reset_index(drop=True, inplace=True)
    
    mv_4 = df['movie_id'] == 4
    mv4 = df[mv_4]
    mv4.reset_index(drop=True, inplace=True)
    
    mv_5 = df['movie_id'] == 5
    mv5 = df[mv_5]
    mv5.reset_index(drop=True, inplace=True)
    
    mv_6 = df['movie_id'] == 6
    mv6 = df[mv_6]
    mv6.reset_index(drop=True, inplace=True)
    
    mv_7 = df['movie_id'] == 7
    mv7 = df[mv_7]
    mv7.reset_index(drop=True, inplace=True)
    
    mv_8 = df['movie_id'] == 8
    mv8 = df[mv_8]
    mv8.reset_index(drop=True, inplace=True)
    
    mv_9 = df['movie_id'] == 9
    mv9 = df[mv_9]
    mv9.reset_index(drop=True, inplace=True)
    
    mv_10 = df['movie_id'] == 10
    mv10 = df[mv_10]
    mv10.reset_index(drop=True, inplace=True)
    
    a.append([mv1,mv2,mv3,mv4,mv5,mv6,mv7,mv8,mv9,mv10])
    return a
    
def d_scatter(scores_f):
    for i in range(10):
            plt.scatter(scores_f[i],1,color='red',marker='*') #scores_f 값을 *으로 마킹. 시각화

def outlier_comp(data):
#     c_data= concat(data)
    ifor=model(data)
    scores_f= -ifor.decision_function(data)
    d_scatter(scores_f)
    return scores_f

def min_score(score): #outlier score 최소인 10개 값 추출
    hi=score.tolist()
    hi.sort()
    a=hi[:10]
    return a

def total_embedding(mv_list):
    vector_list=list()
    
    for i in range(10): #영화개수 10개
        vec= review_embedding(mv_list[0][i])
        score_s=outlier_comp(vec)
        min_value=min_score(score_s)
        ind = index(score_s, min_value)
        for x in ind:
            mv_list[0][i]['clustering'][x]=1
    
    return mv_list


def top_review(score,value,review): #Outlit score 최소인 20개 리뷰 확인
    index = []
    top20_review=[]
    score=score.tolist()
    for i in range(len(value)):
        index.append(score.index(value[i]))
    
    for ind in index:
        top20_review.append(review[ind])
        
    return top20_review


def df_to_list(df):
    review=df['리뷰'].tolist()
    accuracy=df['정확도'].tolist()
    result=df['결과'].tolist()
    # score=final_result['평점'].tolist()
    reviewer=df['작성자'].tolist()
    date=df['날짜'].tolist()
    movie_id=df['movie_id'].tolist()
    clustering=df['clustering'].tolist()
    return review, accuracy, result, reviewer, date, movie_id, clustering

def concat(df):
    final_df=pd.concat([df[0][0],df[0][1],df[0][2],
                   df[0][3],df[0][4],df[0][5],
                   df[0][6],df[0][7],df[0][8],
                   df[0][9],],ignore_index=True)
    return final_df


def db_connect(final_result):
    review, accuracy, result, reviewer, date, movie_id, clustering = df_to_list(final_result)

    conn = pymysql.connect( #DB연결
    host='localhost',
    user='root',
    password='dpdltm137',
    db='movie_review',
    charset='utf8' 
    )
    total = len(review) #리뷰 개수
    curs = conn.cursor()
    
    ###############################
    sql_del = "delete from reviews"
    curs.execute(sql_del)
    conn.commit()
    print("테이블 전체 삭제")
    ###############################
    
    
    sql = "insert into reviews(review_id, review_movie_id, review_contents, review_accuracy, review_result, review_reviewer, review_date, review_clustering) values(%s,%s,%s,%s,%s,%s,%s,%s)"
    for i in range(total):
        print("%d / %d" % (i, total))
        curs.execute(sql, (i+1 ,movie_id[i], review[i], accuracy[i], result[i], reviewer[i], date[i], clustering[i]))
           
        conn.commit()
    print('ok')
    

def start():
    df=step1_get_detail_url()
    url_list=step2_get_reple_href(df)
    df=step3_get_reply_data(url_list)
    df= prepro(df)
    final_result = step7_insert_review(df)
    final_result['clustering']=0
    mv_list=separ(final_result)
    

    real_final_result=total_embedding(mv_list)
    final_df=concat(real_final_result)
    db_connect(final_df)







if __name__ == "__main__":
    start()



