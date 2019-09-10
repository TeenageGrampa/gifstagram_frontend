import React from 'react'
import SearchBar from './SearchBar'

export default class Canvas extends React.Component{

    state = {
        currentUser: {},

    }

    handleClick = () => {
        localStorage.clear()
        this.props.history.push('/')
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
    }

    handleLike = () => {
        fetch('http://localhost:3000/gifs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
          {
              url: this.props.currentGif
          }
      )
    }).then(r => r.json()).then(data => {
        fetch('http://localhost:3000/likes', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
             gif_id: data.id,
             user_id: this.state.currentUser.id   
            })
        }).then(r => r.json()).then(console.log)})}
    

    profileButton = () => {
        this.props.history.push('./profile')
    }

    gotToFeed = () =>{
        this.props.history.push('./feed')
    }


    render(){
        console.log(this.state.currentUser)
        const image = `${this.props.currentGif}`
        return(
        <div>
            <canvas onClick={this.props.handleClick}
            ref="canvas"
            width='900'
            height='600'
            // tabIndex="0" 
            style={{ backgroundImage: `url(${image})`}} 
            className={this.props.currentCursor}/>
            <SearchBar handleSearch={this.props.handleSearch} handleCursor={this.props.handleCursor}/>
            <button onClick={this.handleLike}>Like</button>
            <button onClick={this.profileButton}>Go To Profile</button>
            <button onClick={this.gotToFeed}>Go To Feed</button>
            <button onClick={this.handleClick}>Logout</button>
            {/* {, backgroundSize: 'cover'} */}
        </div>
        )
    }
}

