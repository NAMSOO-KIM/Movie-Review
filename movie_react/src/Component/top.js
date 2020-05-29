import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../img/_Homelogo2.jpg'
import './top.css'

class top extends Component{
    render(){
    return (
            <div>
            <Link to="/"> 
            <img src={logo} alt="kk" />
            </Link>
            </div>
                   
  );
}

}
export default top;
