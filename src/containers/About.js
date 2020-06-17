import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './About.css'
import Top  from '../Component/top.js'
import axios from "axios"
import { requirePropFactory } from '@material-ui/core';
import Middle from '../Component/middle.js'
import { green } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import purple from '@material-ui/core/colors/purple';

import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

let data;

const button_style= {
  position :'absolute',
  top:'440px',
  left:'600px'
}
const button2_style={
  bgcolor:"success.main"
}
//const About = ({match}) => {
class About extends Component{

  constructor(props){
  
    super(props);
    {
        this.state = {
          id : props.match.params.name,
         
        }

    }
}
    _getMovies= async() => {
        const detail = await this._callApi()
        console.log(detail.per)
        const data = [
          { country: '긍정', area: detail.per},
          { country: '부정', area: 100-detail.per },
         
        ];
        this.setState({
          detail,
          data
         
        })
        //console.log(this.state.detail);
      }
      _callApi =() =>{
          return axios.post('/about', {          
                id : this.state.id  
        })
          .then(function(data){
         console.log(data.data.rows[0])
         return data.data.rows[0]
       })
        }
        positive= () =>{
          return axios.post('/1', {
            id : this.state.id
          })
          .then(function(data){
            console.log(data.data.rows)
         const sentence= data.data.rows
         
         this.setState({
           sentence
           
         }) 
         
         console.log(this.state) 
          }.bind(this))
         
        }

       negative= () =>{
         return axios.post('/0', {
           id : this.state.id
         })
         .then(function(data){
           console.log(data.data.rows)
        const sentence= data.data.rows
        
        this.setState({
          sentence
          
        }) 
        
        console.log(this.state) 
         }.bind(this))
        
       }
       
       clustered= () =>{
        return axios.post('/clustered', {
          id : this.state.id
        })
        .then(function(data){
          console.log(data.data.rows)
       const sentence= data.data.rows
       
       this.setState({
         sentence
         
       }) 
       
       console.log(this.state) 
        }.bind(this))
       
      }
      
      componentDidMount(){
        this._getMovies();
        console.log("디드마운트실행 in aboutJS")
      }

   
    

    render(){
      const { data: chartData } = this.state;

      let circleStyle = {
        position: 'absolute',
        display: 'inline-block',
        width: '200px',
        height: '200px',
        top: '-100px',
        left: '1100px',
        textAlign: 'center',
        verticalAlign: 'middle',
        color: 'black'
    }
      

      // let circleStyle = {}
      // if(this.state.detail) {
      //   circleStyle = {
      //     background: 'conic-gradient(blue 0%' + this.state.detail.per + '%, red 0)',
      //     borderRadius: '50%',
      //     display: 'inline-block',
      //     width: '200px',
      //     height: '200px'
      //   }
      // }

    return (
        <div id="About">
             <Top />
   {this.state.detail? <img id ="poster" src={this.state.detail.movie_image}></img> : "loading"}
   {this.state.detail?
   <h2 id="g0">❖ 제목 : {this.state.detail.movie_name}
   </h2> : "Loading.."}
          
          {this.state.detail?
         
          <Button onClick={()=>{
            window.open(this.state.detail.movie_url,'_blank');
          }} 
          style={button_style} size ="large" variant="outlined" 
           color="secondary">예매하기</Button>
          : "loading"}

   {/* {this.state.detail?
   <h2 id="g1">❖ 네티즌 만족도 : {this.state.detail.movie_score}
   </h2> : "Loading.."} */}
   {this.state.detail?
   <h2 id="g1">❖ 장르 : {this.state.detail.movie_genre}
   </h2> : "Loading.."}
   {this.state.detail?
   <h2 id="g2">❖ 감독 : {this.state.detail.movie_directer}
   </h2> : "Loading.."}
   {this.state.detail?
   <h2 id="g4">❖ 배우 : {this.state.detail.movie_actor}
   </h2> : "Loading.."}
   {this.state.detail?
   <h2 id="g3">❖ 관람등급 : {this.state.detail.movie_rate}
   </h2> : "Loading.."}

    {/* {this.state.detail?
   <div id="g6">
     <div style={circleStyle}>
     <div>긍정: {this.state.detail.per}%</div>
     <div>부정: {100 - this.state.detail.per}%</div>
     </div>
   </div>: "Loading.."}  */}
      {this.state.detail?
    <Paper id="gyu_chart" style={circleStyle}>
        <Chart
          data={chartData}
        >
          <PieSeries
            valueField="area"
            argumentField="country"
          />
          <Title
            text="긍정:55% 부정:45%"
          />
          <Animation />
        </Chart>
      </Paper>
      : "Loading.."}
  {this.state.detail? <div>
  <h4 id ="gyu0">긍정:{this.state.detail.per}% </h4>
  <h4 id="gyu00"> 부정:{100-this.state.detail.per}%</h4> 
  </div> : "Loadingg.."}


   {this.state.detail?
  <Button id ="gyu1" variant="contained" color="primary" onClick={this.positive}>긍정리뷰 보기</Button> 
    : "Loadingg.."}

   {this.state.detail?
  <Button id ="gyu2" variant="contained" color="secondary" onClick={this.negative}> 부정리뷰 보기</Button> 
    : "Loadingg.."}

{this.state.detail?
  <Button id ="gyu3" variant="contained"  onClick={this.clustered} > 대중적리뷰 보기</Button> 
    : "Loadingg.."}

{this.state.sentence?
   <Middle sentence={this.state.sentence} />
   : ""}

        </div>
    );
}}


export default About;