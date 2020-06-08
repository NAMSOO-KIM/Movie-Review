import React,{Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import About from './main';
import {Link} from 'react-router-dom';
import './home.css'
import Homelogo from '../img/Homelogo2.PNG'
import video1 from '../img/movie_highlight1.mp4'
import video2 from '../img/vid2.mp4'
import video3 from '../img/vid3.mp4'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from "axios"


class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      contents: '긍정/부정 분류를 체험해보세요.'
    }
  }

  test() {
    let tmp = document.getElementById("contents").value;
    axios.post("/test", {
      contents: tmp
    }).then(function (res) {
      if (res.data.answer==0){
        this.setState({
          contents: res.data.contents + " 부정적인 리뷰 입니다. 정확도:" + res.data.acc
        })    
         }
      if (res.data.answer==1){
          this.setState({
            contents: res.data.contents + " 긍정적인 리뷰 입니다. 정확도:" + res.data.acc
          })    
           }
    }.bind(this))
  }

    render(){
    return (
        <div id="home">

<header class="showcase">
			<div class="showcase-top">
				<img src={Homelogo} alt="" />
			</div>
			<div class="showcase-content">
				<h1>분석된 영화 리뷰를 확인하세요</h1>
				<p>인공지능 분석을 통한 영화리뷰</p>
				 <Link to="/main" style={{ textDecoration: 'none' }}> 
        <Button size ="large" variant="contained" color="secondary"
        //   onClick={()=>{
        //     axios.post('/main', {
        //       gyu: 'client_send'
        //     }).then(function(data1){
        //    console.log(data1)
        //  })
        //  .catch(function(err) {
        //    console.log(err);
        //  })
        //    } }
        >
   시작 하기
</Button>
</Link>
			</div>
		</header>
    <input type="text" id="contents"></input>
    <button onClick={this.test.bind(this)}>긍정/부정 리뷰 확인하기!</button>
    <div>{this.state.contents}</div>
<table>
  <tbody>
<tr>
<td class="long">
  <h1>영화에 대한 리뷰를 실시간으로 확인하세요</h1>
웹 크롤링을 통해 10개의 영화에 대한 네이버 리뷰를 실시간으로 제공합니다.
</td>
<td class="short">
<video autoplay="autoplay" muted="muted" loop>
  <source src={video1}  type="video/mp4"></source>
</video>
</td>
</tr>
 <tr>
  <td colspan="2">
   
  </td>
</tr> 

<tr>
<td class="short">
<video autoplay="autoplay" muted="muted" loop>
  <source src={video2} type="video/mp4"></source>
</video>
</td>
<td class="long">
  <p id="r-text">
<h1>분류된 리뷰를 직관적으로 확인하세요</h1>
기계학습을 통해 텍스트와 평점을 분석하여 긍정적인 리뷰와 부정적인 리뷰로 분류된 리뷰들을 제공합니다.
</p>
</td>  

</tr>  
<tr>
<td class="long">
<h1>다양한 리뷰속에서 가장 대중적인 리뷰를 확인하세요</h1>
클러스터링 기술을 활용하여 다양한 리뷰들 속에서 가장 공통된 의견을 가진 리뷰를 제공합니다.
</td>
<td>
<video autoplay="autoplay" muted="muted" loop>
  <source src={video3} type="video/mp4"></source>
</video>
</td>
</tr>
</tbody>
</table>

</div>
   
   
  );
}

}
export default Home;
