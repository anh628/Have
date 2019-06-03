/**
 * @file React component that prints its props; useful for testing HOCs.
 * @author Julius Diaz Panoriñgan
 */

import React from 'react'
import PropPrint from './PropPrint'
import './PropsPrinter.css'

const PropsPrinter = props => (
  <div className='props-printer'>
    <PropPrint propName='props' prop={props} />
  </div>
)

export default PropsPrinter
