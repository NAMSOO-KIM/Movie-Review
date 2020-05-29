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


const button_style= {
  position :'absolute',
  top:'420px',
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
          id : props.match.params.name
         
        }
    }
}
    _getMovies= async() => {
        const detail = await this._callApi()
        
        this.setState({
          detail
         
          
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
      
      componentDidMount(){
        this._getMovies();
        console.log("디드마운트실행 in aboutJS")
      }

   
    

    render(){

    return (
        <div id="About">
             <Top />
   {this.state.detail? <img id ="poster" src={this.state.detail.movie_image}></img> : "loading"}
   {this.state.detail?
   <h2 id="g0">{this.state.detail.movie_name}
   </h2> : "Loading.."}
          
          {this.state.detail?
         
          <Button onClick={()=>{
            window.open(this.state.detail.movie_url,'_blank');
          }} 
          style={button_style} size ="large" variant="outlined" 
           color="secondary">예매하기</Button>
          : "loading"}

   {this.state.detail?
   <h2 id="g1">{this.state.detail.movie_score}
   </h2> : "Loading.."}
   {this.state.detail?
   <h2 id="g2">{this.state.detail.movie_genre}
   </h2> : "Loading.."}
   {this.state.detail?
   <h2 id="g3">{this.state.detail.movie_directer}
   </h2> : "Loading.."}
   {this.state.detail?
   <h2 id="g4">{this.state.detail.movie_actor}
   </h2> : "Loading.."}
   {this.state.detail?
   <h2 id="g5">{this.state.detail.movie_rate}
   </h2> : "Loading.."}

   {this.state.detail?
  <Button id ="gyu1" variant="contained" color="primary" onClick={this.positive}>긍정리뷰 보기</Button> 
    : "Loadingg.."}

   {this.state.detail?
  <Button id ="gyu2" variant="contained" color="secondary" onClick={this.negative}> 부정리뷰 보기</Button> 
    : "Loadingg.."}

{this.state.detail?
  <Button id ="gyu3" variant="contained" style={button2_style} > 대중적리뷰 보기</Button> 
    : "Loadingg.."}

 

   {this.state.sentence?
   <Middle sentence={this.state.sentence} />
:" 댓글 LOAD,,,"}
        </div>
    );
}}


export default About;