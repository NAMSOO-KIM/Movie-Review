import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './About.css'

 
const About = ({match}) => {
    return (
        <div id="About">
            <h2>{match.params.title}</h2>
        </div>
    );
};
 
export default About;