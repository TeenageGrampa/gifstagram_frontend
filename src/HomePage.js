import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class HomePage extends Component {
  render () {
    return (
      <div>
        <h1 id="gifLogo">Gifstagram</h1>
        <img src="https://fortunedotcom.files.wordpress.com/2016/02/giphy-3.gif" 
          width='900'
          height='600' alt=""/>
        <ul id="main-menu">
        <li><Link to="/login">Go to Login</Link></li>
        <li><Link to="/signup">Go to Signup</Link></li>
        </ul>
      </div>
    );
  }
}

export default HomePage;