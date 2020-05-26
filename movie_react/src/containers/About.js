import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './About.css'
import Top  from '../Component/top.js'
import axios from "axios"
import { requirePropFactory } from '@material-ui/core';


const button_style= {
  position :'absolute',
  top:'140px',
  left:'850px'
}


//const About = ({match}) => {
class About extends Component{
   
  
      
  
  constructor(props){
    
    super(props);
    {
        this.state = {
          name : props.match.params.name
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
                name : this.state.name   
        })
          .then(function(data){
         console.log(data.data.rows[0])
         return data.data.rows[0]
       })
        }
      
      componentDidMount(){
        this._getMovies();
        console.log("디드마운트실행 in aboutJS")
      }

     
    
    render(){
      function positive() {
        alert("네거티브");
        return axios.post('/0', {          
          //d\ 
  })
    .then(function(data){
   console.log(data)
   return data
 })
        }
      


    return (
        <div id="About">
             <Top />
   {this.state.detail? <img id ="poster" src={this.state.detail.movie_image}></img> : "loading"}
          <h2 id="g0"> {this.state.name} </h2>
          
          {this.state.detail?
         
          <Button onClick={()=>{
            window.open(this.state.detail.movie_url,'_blank');
          }} 
          style={button_style} size ="large" variant="contained" 
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
  <button onClick ={positive}> 긍정</button>
   

        </div>
    );
}}


export default About;