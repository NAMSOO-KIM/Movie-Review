import React from 'react';
import './App.css';
import Top from './Component/top'
import Middle from './Component/middle'
import Home from './containers/Home'
import Main from './containers/main'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  render(){
  return (
    <Router>
          <div className="App">
         
          <Route exact path="/" component = {Home}/>
          <Route path="/main" component = {Main}/>
       
     
          </div>
   </Router>

  );
}
}
export default App;