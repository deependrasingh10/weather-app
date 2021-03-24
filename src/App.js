import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
	  console.log('statusChangeCallback');

	  if (response.status === 'connected') {
	    console.log('User logged in successfully');
      this.setState({ buttonName: "Logout" });
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
	  window.FB.login(this.checkLoginState());
	}

  render() {
    return (
      <div className="App">
        <a href="#" onClick={this.handleClick}>{this.state.buttonName}</a>
      </div>
    );
  }
}

export default App;
