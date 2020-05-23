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

# 형태소 분석을 위한 함수
def tokenizer(text) :
    okt = Okt()
    return okt.morphs(text)

def get_data(url,re_list):
    rslist = []
    count=0
    resp = requests.get(url)
    html = BeautifulSoup(resp.content, 'html.parser')
    score_result = html.find('div', {'class': 'score_result'})
    lis = score_result.findAll('li')
    for li in lis:
        rslist= {'reple' : li.p.text, 'score': li.find('em').getText()}
        re_list.append(rslist)
        
        
        #watch_movie = li.find('span', {'class':'ico_viewer'})

def one_movie_prepro(re_list): 
    import numpy as np
    df=pd.DataFrame(re_list)
    df.columns = ["리뷰","평점"]

    df['리뷰']=df['리뷰'].str.replace(pat='관람객', repl='', regex=False)
    df[df['리뷰'].str.contains("스포일러가 포함된 감상평입니다. 감상평 보기")]= np.nan #nan으로 변경

    df['리뷰']= df['리뷰'].str.strip()  # 앞 뒤 공백을 제거
    df=df.replace('',np.NaN)
    df=df.dropna()    
#     df.dropna()
    return df

def one_movie_get_review():
    #예매순위 1순위

    df = pd.read_csv('movie_url_list.csv')
    url_list = df['url'].tolist()

    # for url in url_list :
        #    print(url)
    test_url = url_list[0]
    resp = requests.get(test_url)
    html = BeautifulSoup(resp.content, 'html.parser')
    result = html.find('div', {'class':'score_total'}).find('strong').findChildren('em')[0].getText()
    total_count = int(result.replace(',', ''))
    re_list= []


    for i in range(1, int(total_count / 10) + 1):
    #for i in range(1, int(total_count / 100) + 1):
        url = test_url + '&page=' + str(i)
        #print('url: "' + url + '" is parsing....')
        get_data(url,re_list)
    review_df = pd.DataFrame()
    review_df=one_movie_prepro(re_list)

    return review_df
#     re_list

def step7_insert_review(df) :
    # 객체를 복원한다.
    with open('pipe.dat', 'rb') as fp:
        pipe = pickle.load(fp)

    import numpy as np
    import pandas as pd

    
    rlist=df["리뷰"].tolist()
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
    return df_result

if __name__ == "__main__":
    df=one_movie_get_review()
    final_result = step7_insert_review(df)
    final_result.tail(50)  #1 긍정, 0 부정
    #final_result 안에 컬럼 3개
    #리뷰, 정확도, 결과(0,1) 0:부정 , 1:긍정
    review=final_result['리뷰'].tolist() #review 안에 리뷰들 리스트 형태로 저장
    accuracy=final_result['정확도'].tolist() #accuracy 안에 리뷰들 리스트 형태로 저장
    result=final_result['결과'].tolist() #result 안에 리뷰들 리스트 형태로 저장
