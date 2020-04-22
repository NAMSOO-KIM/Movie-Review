import React,{Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import About from './About';
import {Link} from 'react-router-dom';
import './home.css'
import logo1 from '../img/movie_parasite.jpg'
import logo2 from '../img/movie_tobusan.jpg'
import logo3 from '../img/movie1917.jpg'
class Home extends Component{
    render(){
    return (
        <div>
        <h1>분석된 영화 리뷰를 확인하세요</h1>
        <h3>인공지능 분석을 통한 영화 리뷰</h3>
        <Link to="/about" style={{ textDecoration: 'none' }}>
    <button>시 작</button>
  </Link>


<table border='1' height="300">
    <tr>
<td>영화에 대한 리뷰를 실시간으로 확인하세요
웹 크롤링을 통해 20개의 영화에 대한 네이버 리뷰를 실시간으로 제공합니다.
</td>
<td> <img class="logo1" src={logo1}></img> </td>
</tr>
</table>


<p>
분류된 리뷰를 직관적으로 확인하세요
기계학습을 통해 텍스트와 평점을 분석하여 긍정적인 리뷰와 부정적인 리뷰로 분류된 리뷰들을 제공합니다.
</p>

<p>    
다양한 리뷰속에서 가장 대중적인 리뷰를 확인하세요
클러스터링 기술을 활용하여 다양한 리뷰들 속에서 가장 공통된 의견을 가진 리뷰를 제공합니다.
</p>


        </div>   
   
  );
}

}
export default Home;
