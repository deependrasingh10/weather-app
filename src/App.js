import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';

class App extends Component {

  render() {
    return (
      <BrowserRouter basename='/weatherApp'>
        <Switch>
          <Route component={Login} path="/" exact />
          <Route component={Dashboard} path="/dashboard" exact />
          {/* <PrivateRoute component={Dashboard} path="/dashboard" exact /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;