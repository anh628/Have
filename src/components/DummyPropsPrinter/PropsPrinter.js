/**
 * @file React component that prints its props; useful for testing HOCs.
 * @author Julius Diaz Panoriñgan
 */

import React from 'react'
import PropPrint from './PropPrint'
import './PropsPrinter.css'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
// import { connect } from 'react-redux'

const PropsPrinter = props => (
  <div className='props-printer'>
    <PropPrint propName='props' prop={props} />
  </div>
)

export default compose(
  firestoreConnect(props => [
    {
      collection: 'users'
    }
  ]) // going to get todos for a user
)(PropsPrinter)
