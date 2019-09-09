import React from 'react'

export default class SearchBar extends React.Component {

    state = {
        search: '',
        cursor: 'potion'
    }

    handleChange = (e) =>{
        this.setState({
            search: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.handleSearch(this.state.search)
    }

    handleChangeCursor = (e) =>{
        this.setState({
            cursor: e.target.value
        })
    }

    handleCursorSubmit = (e) =>{
        e.preventDefault()
        this.props.handleCursor(this.state.cursor)
    }

    render(){
        // console.log(this.state.search)
        return(
        <div id="searchbar">
            <form onSubmit={this.handleSubmit}>
                <label>Search</label><br></br>
                <input  value={this.state.seach} type="text" onChange={this.handleChange} />
                <input type="submit" />
            </form>
            <form onSubmit={this.handleCursorSubmit}>
                <label>Choose Cursor</label><br></br>
                <select onChange={this.handleChangeCursor} >
                    <option value="potion">Potion</option>
                    <option value="sword">Sword</option>
                    <option value="giant">Giant</option>
                    <option value="cat">Cat</option>
                </select>
                <input type="submit"/>
            </form>
        </div>
        )
    }
}