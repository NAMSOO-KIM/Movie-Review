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




class main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        MovieData: [
            {name: "1897", desc: "독일군에 의해 모든 통신망이 파괴된 상황 속에서"},
            {name: "강남", desc: "영국군 병사 '스코필드'(조지 맥케이)와 '블레이크'(딘-찰스 채프먼)에게 하dddd"},
            {name: "외상", desc: "둘은 1600명의 아군과 '블레이크'의 형(리차드 매든)을 구하기 위해"},
            {name: "남자가 사랑할때", desc: "함정에 빠진 영국군 부대의 수장장군(콜린 퍼스)의 공격 중지 명령을 전하는 것!"},
            {name: "1897", desc: "독일군에 의해 모든 통신망이 파괴된 상황 속에서"},
            {name: "강남", desc: "영국군 병사 '스코필드'(조지 맥케이)와 '블레이크'(딘-찰스 채프먼)에게 하dddd"},
            {name: "외상", desc: "둘은 1600명의 아군과 '블레이크'의 형(리차드 매든)을 구하기 위해"},
            {name: "남자가 사랑할때", desc: "함정에 빠진 영국군 부대의 수장장군(콜린 퍼스)의 공격 중지 명령을 전하는 것!"},
            {name: "1897", desc: "독일군에 의해 모든 통신망이 파괴된 상황 속에서"},
            {name: "강남", desc: "영국군 병사 '스코필드'(조지 맥케이)와 '블레이크'(딘-찰스 채프먼)에게 하dddd"},
            {name: "외상", desc: "둘은 1600명의 아군과 '블레이크'의 형(리차드 매든)을 구하기 위해"},
            {name: "남자가 사랑할때", desc: "함정에 빠진 영국군 부대의 수장장군(콜린 퍼스)의 공격 중지 명령을 전하는 것!"},
            {name: "1897", desc: "독일군에 의해 모든 통신망이 파괴된 상황 속에서"},
            {name: "강남", desc: "영국군 병사 '스코필드'(조지 맥케이)와 '블레이크'(딘-찰스 채프먼)에게 하dddd"},
            {name: "외상", desc: "둘은 1600명의 아군과 '블레이크'의 형(리차드 매든)을 구하기 위해"},
            {name: "남자가 사랑할때", desc: "함정에 빠진 영국군 부대의 수장장군(콜린 퍼스)의 공격 중지 명령을 전하는 것!"},
            {name: "1897", desc: "독일군에 의해 모든 통신망이 파괴된 상황 속에서"},
            {name: "강남", desc: "영국군 병사 '스코필드'(조지 맥케이)와 '블레이크'(딘-찰스 채프먼)에게 하dddd"},
            {name: "외상", desc: "둘은 1600명의 아군과 '블레이크'의 형(리차드 매든)을 구하기 위해"},
            {name: "남자가 사랑할때", desc: "함정에 빠진 영국군 부대의 수장장군(콜린 퍼스)의 공격 중지 명령을 전하는 것!"}

        ]
    };
}

    render(){
      
      const maptoComponent = data=>{
        return data.map((MovieData, index) => {
          return (<Movie title={MovieData.name} desc={MovieData.desc} key={index} />);
        });
      };
      
    return(
      <div id="main">
        <Top />

        <h2>예매율 순위 1~20위</h2>

        {maptoComponent (this.state.MovieData)}
        
        </div>
    
 );
 }

}    
export default main;
