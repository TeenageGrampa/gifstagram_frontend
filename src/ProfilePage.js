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
    this.props.history.push('/')
  }

  backToCanvas = () => {
    this.props.history.push('./canvas')
  }

  gotToFeed = () =>{
    this.props.history.push('./feed')
}

  render() {
    // console.log(this.state)
    const gifs = this.state.gifs.map(gif => <img key={gif.id} src={gif.url} width={600} alt=""/>) 
    return (
      <div>
        <button onClick={this.handleClick}>Logout</button>
        <button onClick={this.gotToFeed}>Go To Feed</button>
        <button onClick={this.backToCanvas}>Back to Canvas</button>
        {
          this.props.username ?
          <div><h1>Welcome {this.state.currentUser.username}!</h1>
          <h2>Your favorite gifs:</h2></div> :
          <h1>getting your info...</h1>
        }
        {gifs}
      </div>
    );
  }
}

export default ProfilePage;