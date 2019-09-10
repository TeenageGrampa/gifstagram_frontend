import React from 'react'

export default class Feed extends React.Component {

    state={
        gifs: []
    }

    backToCanvas = () => {
        this.props.history.push('./canvas')
    }

    handleClick = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    componentDidMount(){
        fetch('http://localhost:3000/gifs')
        .then(r => r.json())
        .then(gifs => this.setState({
            gifs: gifs
        }))
    }

    render() {
        console.log(this.state)
        const gifs = this.state.gifs.map(gif => <img key={gif.id} src={gif.url} width={600} alt=""/>) 
        return (
          <div>
            <button onClick={this.handleClick}>Logout</button>
            <button onClick={this.backToCanvas}>Back to Canvas</button>
            {gifs}
          </div>
        );
      }
}