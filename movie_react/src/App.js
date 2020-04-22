import React from 'react';
import './App.css';
import Top from './Component/top'
import Middle from './Component/middle'
import Home from './containers/Home'
import About from './containers/About'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  render(){
  return (
    <Router>
          <div className="App">
          <Top />
          <Route exact path="/" component = {Home}/>
          <Route path="/about" component = {About}/>
       
     
          </div>
   </Router>

  );
}
}
export default App;