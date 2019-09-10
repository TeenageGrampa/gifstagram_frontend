import React from 'react';
import './App.css';
import Canvas from './Canvas';
import HomePage from './HomePage.js';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ProfilePage from './ProfilePage';
import Feed from './Feed';
import { Switch, Route, withRouter } from 'react-router-dom'



class App extends React.Component {

  state={
    currentUser: {},
    username: '',
    currentGif: '',
    search: '',
    currentCursor: 'potion'
  }

  componentDidMount(){
    if (localStorage.token) {
      fetch('http://localhost:3000/profile',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(user => this.setState({currentUser: user, username: user.username}))
    } else {
      this.props.history.push('/canvas')
    }
      const mykey = 'ubRdaXWka1QsuEicM124SxibfeWjCLTC'
      if(this.state.search){
          const term = this.state.search
          fetch(`https://api.giphy.com/v1/gifs/random?api_key=${mykey}&tag=${term}&limit=1`).then(r => r.json()).then(
              gifData =>  this.setState({
              currentGif: gifData.data.image_url
          }))
      } else {
          fetch(`https://api.giphy.com/v1/gifs/random?api_key=${mykey}&limit=1`).then(r => r.json()).then(
              gifData => this.setState({
              currentGif: gifData.data.image_url
          }))
      }
      
  }



  handleClick = () =>{
      const mykey = 'ubRdaXWka1QsuEicM124SxibfeWjCLTC'
      if(this.state.search){
          const term = this.state.search
          fetch(`https://api.giphy.com/v1/gifs/random?api_key=${mykey}&tag=${term}&limit=1`).then(r => r.json()).then(
              gifData =>  this.setState({
              currentGif: gifData.data.image_url,
              search: term
          }))
      } else {
          fetch(`https://api.giphy.com/v1/gifs/random?api_key=${mykey}&limit=1`).then(r => r.json()).then(
              gifData => this.setState({
              currentGif: gifData.data.image_url
          }))
      }
  }

  handleSearch = (term) =>{
    const mykey = 'ubRdaXWka1QsuEicM124SxibfeWjCLTC'
    this.setState({
      search: term
    })
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${mykey}&tag=${term}&limit=1`).then(r => r.json()).then(
              gifData =>  this.setState({
              currentGif: gifData.data.image_url,
              search: term
    }))
    
  }

  handleCursor = (cursor) =>{
    this.setState({
      currentCursor: cursor
    })
  }


  render(){
    return (
      <Switch>
        <Route
          path={'/profile'}
          render={routerProps => <ProfilePage {...routerProps} username={this.state.username}/>} />
        <Route
          path={'/canvas'}
          render={routerProps => 
          <Canvas {...routerProps} handleClick={this.handleClick} handleSearch={this.handleSearch} handleCursor={this.handleCursor} currentGif={this.state.currentGif} currentCursor={this.state.currentCursor}/>
          // <SearchBar handleSearch={this.handleSearch} handleCursor={this.handleCursor}/>
          }/>
        <Route path={'/login'} component={LoginPage} />
        <Route path={'/signup'} component={SignUpPage} />
        <Route path={'/feed'} render={routerProps => <Feed {...routerProps} currentUser={this.state.currentUser}/>}/>
        <Route path={'/'} component={HomePage} />
      </Switch>
    );
  }
}

export default withRouter(App)
