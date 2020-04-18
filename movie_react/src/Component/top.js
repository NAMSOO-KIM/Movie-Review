import React,{Component} from 'react';
import styled from 'styled-components';
import logo from '../img/HomeButton.PNG'

class top extends Component{
    render(){
    return (
                <div className="logo">
                    <img 
                    src={logo} alt="홈버튼"/>
        </div>
   
  );
}

}
export default top;
