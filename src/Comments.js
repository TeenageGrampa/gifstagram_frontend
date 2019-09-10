import React from 'react'

export default class Comments extends React.Component{


    state = {
        newComment: '',
        comments: []
    }

    handleChange = (e) => {
        this.setState({
            newComment: e.target.value
        })
    }

    componentDidMount(){
        this.setState({
            comments: this.props.gif.comments
        })
    }

    handleComment = (e) => {
        e.stopPropagation()
        e.preventDefault()
        
        const newComment = this.state.newComment
        fetch(`http://localhost:3000/comments`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                gif_id: this.props.gif.id,
                user_id: this.props.currentUser.id,
                content: newComment
            })
        }).then(r => r.json()).then(data => this.setState({
            comments: [...this.state.comments, data],
            newComment: ''
        }))
    }


    render(){
        console.log(this.props.gif.comments)
        const comments = this.state.comments.map(comment => <li key={comment.id}>{comment.content}</li>)
        return(
            <div>
                <p>comments:</p>
                    <ul>{comments}</ul>
                <form onSubmit={this.handleComment}>
                        <label>New Comment </label>
                        <input type="text" value={this.state.newComment} onChange={this.handleChange} />
                        <input type="submit" />
                </form>
            </div>
        )
    }
}