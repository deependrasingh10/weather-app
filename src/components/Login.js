import React, { Component } from 'react';
// import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import MenuBar from './MenuBar';

class Login extends Component {
  constructor(props){
    super(props); 
    this.state = {
      buttonName: "Login"
    }
    this.handleClick = this.handleClick.bind(this);
  }
	componentDidMount() {
	  window.fbAsyncInit = function() {
	    window.FB.init({
	      appId      : '233405661863175',
	      cookie     : true,
	      xfbml      : true, 
	      version    : 'v2.0'
	    });
	    window.FB.getLoginStatus(function(response) {
	      this.statusChangeCallback(response);
	    }.bind(this));
	  }.bind(this);

	  (function(d, s, id) {
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) return;
	    js = d.createElement(s); js.id = id;
	    js.src = "//connect.facebook.net/en_US/sdk.js";
	    fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));
	}

	statusChangeCallback(response) {

	  if (response.status === 'connected') {
	    console.log('User logged in successfully');
        localStorage.setItem('userInfo', JSON.stringify(response));
      this.setState({ buttonName: "Logout" });
      this.props.history.push('/dashboard')
      console.log(JSON.stringify(response));
	  } else if (response.status === 'not_authorized') {
	    console.log('Please log into weather app.');
	  } else {
	    console.log('Please log into Facebook.');
	  }
	}

	checkLoginState() {
	  window.FB.getLoginStatus(function(response) {
	    this.statusChangeCallback(response);
	  }.bind(this));
	}

	handleClick() {
      let response = localStorage.getItem('userInfo');
      if (response.status !== 'connected') {
        window.FB.login(this.checkLoginState());
      } else {
          console.log('You are in else')
          this.props.history.push('/dashboard')
      }
	}

  render() {
    return (
      <div className="App">
		  <MenuBar handleClick={this.handleClick}/>
          {/* <Button onClick={this.handleClick}>{this.state.buttonName}</Button> */}
      </div>
    );
  }
}

export default Login;
