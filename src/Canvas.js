import React from 'react'
import SearchBar from './SearchBar'

export default class Canvas extends React.Component{

    handleClick = () => {
        localStorage.clear()
        this.props.history.push('/login')
    }

    handleLike = () => {
        console.log('like')
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
            <button onCLick={this.handleLike}>Like</button><button onClick={this.handleClick}>Logout</button>
            {/* {, backgroundSize: 'cover'} */}
        </div>
        )
    }
}

