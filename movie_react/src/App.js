import React from 'react';
import './App.css';
import Top from './Component/top'
import Middle from './Component/middle'
import Home from './containers/Home'
import Main from './containers/main'
import About from './containers/About'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class App extends React.Component {
  render(){
  return (
    <Router>
          <div className="App">
         
          <Route exact path="/" component = {Home}/>
          <Route path="/main" component = {Main}/>
          <Switch>
          <Route path="/about/:name" component ={About}/>
          <Route path="/about" component ={About}/>
          </Switch>
          
          </div>
   </Router>

  );
}
}
export default App;