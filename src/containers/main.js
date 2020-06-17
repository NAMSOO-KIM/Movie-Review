import React,{Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import './main.css'
import Top  from '../Component/top.js'
import Movie  from '../Component/movie.js'
import movietop1  from '../img/movie_tobusan.PNG'
import { sizing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import About from './About';
import axios from "axios"


const formStyle= {
    

  display :'inline-block',
  backgroundColor: '#fcfcfb',

}
const submitStyle ={
  height:'55px'
}

class main extends React.Component{
  _searchContact=(e) => {
    this.setState({
      keyword : e.target.value
    })
  
  }


  
  constructor(props){
  super(props);{

      this.state = {
      keyword:'',
     
      
      }
      
   
    }
  }
  //  _renderMovies=() => {
  //    console.log("렌더무비함수실행");
  //    const movies = this.state.movies.map(movie => {
  //      return <Movie name ={movie.movie_name} image={movie.movie_image}
  //       url={movie.movie_url} rate= {movie.movie_rate} 
  //       genre={movie.movie_genre} director = {movie.movie_directer}
  //       actor ={ movie.movie_actor} score= {movie.movie_score} 
  //       percent={movie.movie_percent} key={movie.movie_id} />
  //    })
  //    return movies
  //    console.log(`랜더무비함수:movies`)
  //  }

  _getMovies= async() => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
    // console.log(this.state.movies);
  }
  _callApi =() =>{
      return axios.post('/main', {
        data: 'send for main.js'
      })
      .then(function(data){
    //  console.log(data.data.rows)
     return data.data.rows
   })
    }
  
  componentDidMount(){
    this._getMovies();
    
  }


    render(){
      
        
        const mapToComponents = (data) => {
    
           data.sort(); // 3-1. this.state.contactData 를 정렬 (유니코드 값을 기준으로)
          data = data.filter( // 3-2. 정렬된 데이터를 필터링
            (movie) => { // 콜백함수의 인자는 element[, index, array] 콜백함수의 리턴값은 리턴값을 만족하는 엘리먼트들의 새로운 배열
              return movie.movie_name.toLowerCase() // 이름기준, 대소문자 구별 없이, 검색 (indexOf 메서드로)
              .indexOf(this.state.keyword.toLowerCase()) > -1; // indexOf메서드의 인자는 검색할 내용 (string) 검색 결과가 없으면 리턴값은 -1
           }
         ); // 4. input 태그에 글자가 입력 될 때마다 리턴되는 배열이 달라짐. 필터링 된 배열을 data에 담고
         return data.map( // 5. 해당 data 배열을 매핑
           movie => { // map 메서드의 첫 번째 인자 - item, 두 번째 인자 - index
              return <Movie id ={movie.movie_id}   name ={movie.movie_name} image={movie.movie_image}
                     url={movie.movie_url} rate= {movie.movie_rate} 
                     genre={movie.movie_genre} director = {movie.movie_directer}
                     actor ={ movie.movie_actor} score= {movie.movie_score} 
                     percent={movie.movie_percent} />
            } 
          );
        }
      
     


        
    return(
      <div id="main">
        <Top />

        <h2>예매율 순위 1~10위</h2>
        <form className={main} autoComplete="off" style={formStyle}>
          <TextField name="keyword" label="영화 제목" color="secondary"
          onChange={this._searchContact} value={this.state.keyword} variant="outlined" />
  
        </form>
       
        {this.state.movies ? mapToComponents(this.state.movies) :"loading.."}
        
        
        </div>
    
 );
 }

}    
export default main;
