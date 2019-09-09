import React from 'react'
import SearchBar from './SearchBar'

export default class Canvas extends React.Component{

    state = {
        currentUser: {}
    }

    handleClick = () => {
        localStorage.clear()
        this.props.history.push('/login')
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
              url: this.props.currentGif,
              user_id: this.state.currentUser.id
          }
      )
    }).then(r => r.json()).then(console.log)
    }


    render(){
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
            <button onClick={this.handleLike}>Like</button><button onClick={this.handleClick}>Logout</button>
            {/* {, backgroundSize: 'cover'} */}
        </div>
        )
    }
}

