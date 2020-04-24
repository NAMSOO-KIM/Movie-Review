import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../img/Homelogo2.PNG'
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
