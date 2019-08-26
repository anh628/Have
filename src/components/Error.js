import React from 'react'
import { Link } from 'react-router-dom'

// This templates was made by Colorlib (https://colorlib.com)
const Error = () => (
  <div id='notfound'>
    <div className='notfound'>
      <div className='notfound-404'>
        <h1>Oops!</h1>
        <h2>404 - Page Not Found</h2>
      </div>
      <Link to='/'>GO TO HOMEPAGE</Link>
    </div>
  </div>
)

export default Error
