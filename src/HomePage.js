import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class HomePage extends Component {
  render () {
    return (
      <div>
        Gifstagram
        <ul>
        <li><Link to="/login">Go to Login</Link></li>
        <li><Link to="/signup">Go to Signup</Link></li>
        </ul>
      </div>
    );
  }
}

export default HomePage;