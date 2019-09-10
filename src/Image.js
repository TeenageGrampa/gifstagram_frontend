import React from 'react';
import Comments from './Comments'

export default class Image extends React.Component{

    state ={
        clicked: false,
        likes: 0,
    }

    handleInfoClick = () => {
        this.setState({
          clicked: !this.state.clicked
        })
    }

    componentDidMount(){
        this.setState({
            likes: this.props.gif.likes.length
        })
    }

    handleLike = (e) => {
        e.stopPropagation()
        fetch(`http://localhost:3000/likes`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                gif_id: this.props.gif.id,
                user_id: this.props.currentUser.id
            })
        }).then(r => r.json()).then(this.setState({
            likes: this.state.likes + 1
        }))
    }

    stopProp = (e) => {
        e.stopPropagation()
    }

    

    render(){
        // console.log(this.props)
        return(
            <div onClick={this.handleInfoClick}>
                <img key={this.props.gif.id} src={this.props.gif.url} width={600} alt=""/>
                {this.state.clicked ? 
                <div onClick={this.stopProp}>
                    <p>likes: {this.state.likes}</p><button onClick={this.handleLike}>Like!</button>
                    <div>
                        <Comments gif={this.props.gif} currentUser={this.props.currentUser}/>
                    </div>
                </div>
                 : null}
            </div>
        )
    }
}