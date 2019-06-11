import './App.css'
import { connect } from 'react-redux'
import AuthenticationButton from './components/AuthenticationButton'
import NewCollection from './components/NewCollection'
import React, { Component } from 'react'
import List from './components/List'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <AuthenticationButton />
        <header className='App-header'>
          <NewCollection uid={this.props.uid} />
        </header>
        <List uid={this.props.uid} />
      </div>
    )
  }
}

export default connect(state => ({
  uid: state.firebase.auth.uid
}))(App)
