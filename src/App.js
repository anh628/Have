import './App.css'
import { connect } from 'react-redux'
import AuthenticationButton from './components/AuthenticationButton'
import NewCollection from './components/NewCollection'
import React, { Component } from 'react'
import List from './components/List'

// const App = ({ uid }) => {
//   return (
//     <div className='App'>
//       <AuthenticationButton />
//       <header className='App-header'>
//         <NewCollection uid={uid} />
//       </header>
//       {/* <List uid={uid} /> */}
//     </div>
//   )
// }

class App extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     visible: false
  //   }
  // }

  // openModal () {
  //   this.setState({
  //     visible: true
  //   })
  // }

  // closeModal () {
  //   this.setState({
  //     visible: false
  //   })
  // }

  render () {
    return (
      <div className='App'>
        <AuthenticationButton />
        <header className='App-header'>
          {/* <Modal
            visible={this.state.visible}
            width='400'
            height='300'
            effect='fadeInUp'
            onClickAway={() => this.closeModal()}> */}
          <NewCollection uid={this.props.uid} />
          {/* </Modal> */}
        </header>
        {/* <List uid={this.props.uid} /> */}
      </div>
    )
  }
}

export default connect(state => ({
  uid: state.firebase.auth.uid
}))(App)
