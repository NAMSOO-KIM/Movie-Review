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
import sys
import base64

# 형태소 분석을 위한 함수
def tokenizer(text) :
    okt = Okt()
    return okt.morphs(text)

    
def step6_using_model() :
    # 객체를 복원한다.
    with open('pipe_model.dat', 'rb') as fp:
        pipe = pickle.load(fp)

    import numpy as np

    # while True :
        # text = input('리뷰를 작성해주세요 :')
    text = sys.argv[1]
    str = [text]
    # 예측 정확도
    r1 = np.max(pipe.predict_proba(str) * 100)
    # 예측 결과
    r2 = pipe.predict(str)[0]

    if r2 == '1' :
        print('1:%.3f' % r1)
         
    else :
        print('0:%.3f' % r1)

        


if __name__ == "__main__":
    step6_using_model()

    