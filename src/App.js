import React from 'react';
import './App.css';
import {BrowserRouter, Router, Link, Switch, Route, Redirect} from 'react-router-dom';

import SignUp from './components/sign_up';
import SignIn from './components/sign_in';

import Manager from './components/Dashboards/Manager';
import Clerk from './components/Dashboards/Clerk';
import Admin from './components/Dashboards/Admin';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      page:"sign_in"
    };
  }
  render(){
    return(
    <Switch>
      <Route exact path="/sign_in" component={SignIn} />
      <Route path="/sign_up" component={SignUp} />
      <Route path="/Manager" component={Manager} />
      <Route path="/Clerk" component={Clerk} />
      <Route path="/Admin" component={Admin} />
      <Redirect to="sign_in"/>
    </Switch>
    );
  }
}

export default App;
