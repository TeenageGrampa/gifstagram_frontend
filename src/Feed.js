import React from 'react';
import Image from './Image'

export default class Feed extends React.Component {

    state={
        gifs: [],
        currentUser: {}
    }

    backToCanvas = () => {
        this.props.history.push('./canvas')
    }

    handleClick = () => {
        localStorage.clear()
        this.props.history.push('/')
        // this.location.refresh()
    }

    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                currentUser: this.props.location.state.currentUser
            })
        } else {
            this.setState({
                currentUser: this.props.currentUser
            })}
        fetch('http://localhost:3000/gifs')
        .then(r => r.json())
        .then(gifs => {const filteredGifs = gifs.filter(gif => gif.likes.length > 0)
            this.setState({
            gifs: filteredGifs,
        })})
       
    }

    render() {
        // console.log(this.props)
        console.log(this.state.currentUser)
        const gifs = this.state.gifs.map(gif => <Image key={gif.id} currentUser={this.state.currentUser} gif={gif} width={600}/>) 
        return (
          <div>
            <button onClick={this.handleClick}>Logout</button>
            <button onClick={this.backToCanvas}>Back to Canvas</button>
            {gifs}
          </div>
        );
      }
}