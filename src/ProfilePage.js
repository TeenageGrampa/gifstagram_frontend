import React, { Component } from 'react';

class ProfilePage extends Component {

  state = {
    currentUser: {},
    gifs: []
  }
  componentDidMount(){
    fetch('http://localhost:3000/profile',{
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    }
    })
    .then(res => res.json())
    .then(user => this.setState({
        currentUser: user
    }))
    fetch(`http://localhost:3000/users/${this.state.currentUser.id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    }
    })
    .then(res => res.json())
    .then(gifData => this.setState({
      gifs: gifData
    }))
  }

  handleClick = () => {
    localStorage.clear()
    this.props.history.push('/login')
  }
  backToCanvas = () => {
    this.props.history.push('./canvas')
  }

  render() {
    // console.log(this.state)
    const gifs = this.state.gifs.map(gif => <img src={gif.url}/>) 
    return (
      <div>
        <button onClick={this.handleClick}>Logout</button>
        <button onClick={this.backToCanvas}>Back to Canvas</button>
        {
          this.props.username ?
          <h1>Welcome {this.state.currentUser.username}!</h1> :
          <h1>getting your info...</h1>
        }
        {gifs}
      </div>
    );
  }
}

export default ProfilePage;