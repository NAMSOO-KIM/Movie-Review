# 개발환경

- React. js

- Node.js

- MySQL

- Python 3.6

  

- 활용 라이브러리

  - Scikit-learn

  - KoNLPy

  - FastText

  - Beautifulsoup

    

# 팀 구성

+ 김남수: AI
+ 한규정: 프론트 엔드
+ 천승민: 백엔드




# 1.제목
텍스트 마이닝을 활용한 영화 리뷰 분석



# 2.배경 및 문제
![image](https://user-images.githubusercontent.com/63775931/97797081-2c8e6d80-1c5d-11eb-9041-05960e3d1d8e.png)   
+ 영화를 예매하기 전 영화에 대한 리뷰를 먼저 확인하고 예매할 만큼 리뷰의 영향
  력은 매우 큼

+ 하지만 한 가지 영화에 대해 다양한 리뷰가 나올 수 있기 때문에 예매자 입장에서
  어떤 리뷰를 참고해야 할지 혼란스러움

+ 또한 영화에 대해 평점을 부여하는 기준이 사람마다 다르기 때문에 평점을 기준으로
  영화를 판단하기 어려움

+ 사람들이 주로 1점과 10점으로 평점을 주기 때문에 전체 평점이 1점과 10점 비율로
  계산되어 평점으로서의 제 기능을 하지 못함

  

# 3. 목표
+ 이 프로젝트는 텍스트마이닝을 통해 리뷰 내용을 분석하여 긍정적인 리뷰와 부정적인
 리뷰를 분류하고 긍정/부정 비율을 도식화하여 보여준다. 또한 가장 대중적인 리뷰(클러스
터링을 통한 가장 중심의 리뷰)를 제공한다.
+ 이를 통해 사용자는 직관적으로 영화에 대한 평가를 확인할 수 있고 긍정, 부정, 대중적인
리뷰(클러스터링을 통한 가장 중심의 리뷰)를 참고하여 올바른 예매를 할 수 있도록 돕는
다. 최종적으로 문화생활의 만족도를 높이는 것이 이 프로젝트의 목표이다.



# 4. 일정
![image](https://user-images.githubusercontent.com/63775931/97797119-ab83a600-1c5d-11eb-81eb-3b5c42dfe0f6.png)   
# 5. 기대 효과
+ 영화에 대한 명확한 지표 제공

 + 일반적으로 사용되는 평점 시스템을 통해 영화를 평가하는 것이 아닌 리뷰들의 긍정/부정
  비율을 도식화하여 보여줌으로써 영화에 대한 명확한 지표 제공

 + 리뷰 내용을 분석하여 대중적인 리뷰(클러스터링을 활용한 가장 중심의 리뷰)를 제공함으로
  써 사용자의 영화 예매에 도움을 줄 수 있음

+ 높은 접근성

 + 사용에 있어서 복잡한 회원가입과 인증 등의 번거로운 절차를 과감히 생략한 특징을 가짐

 + 쉽고 빠르게 리뷰를 확인하고 예매할 수 있어 접근성이 뛰어남
 +영화에 대한 검색기능과 정렬기능을 통한 서비스 효율성 제공
 
 
# 6. 구현 내용
![image](https://user-images.githubusercontent.com/63775931/97797152-0a491f80-1c5e-11eb-8bca-f2602d1123b9.png)   
<index 페이지>   
![image](https://user-images.githubusercontent.com/63775931/97797160-1af99580-1c5e-11eb-895d-d1feedc6b21e.png)   
![image](https://user-images.githubusercontent.com/63775931/97797163-2220a380-1c5e-11eb-94dd-b3ab60b61334.png)   
<리뷰 테스트를 실시간으로 체험하는 기능>   

--------
![image](https://user-images.githubusercontent.com/63775931/97797178-585e2300-1c5e-11eb-99a6-2c296fab0a16.png)   
<Index 페이지에서 시작하기 버튼을 눌렀을 시 이동하는 페이지>   
![image](https://user-images.githubusercontent.com/63775931/97797181-5b591380-1c5e-11eb-8318-11e98cf61175.png)   
<영화를 검색하여 필터링하는 기능>   

-------

![image](https://user-images.githubusercontent.com/63775931/97797191-70ce3d80-1c5e-11eb-9250-961441c95045.png)   
<영화 그림을 클릭 했을 시 이동하는 페이지>   

![image](https://user-images.githubusercontent.com/63775931/97797194-7461c480-1c5e-11eb-9ba8-d4b18326ceac.png)   
<영화 정보 밑에는 기계학습으로 인해 분류된 리뷰들이 있다.>   



 + ER-Diagram   
   ![image](https://user-images.githubusercontent.com/63775931/97797384-f3a3c800-1c5f-11eb-83b7-04260e4c685a.png)   

 