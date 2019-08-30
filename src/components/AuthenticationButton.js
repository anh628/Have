<<<<<<< HEAD
import React from 'react'
import useAuthState from '../hooks/useAuthState'
import useToggle from '../hooks/useToggle'
=======
import React, { useState } from 'react'
import useAuthState from '../hooks/useAuthState'
>>>>>>> master1
import { login, logout } from '../firebase/auth'
import { Avatar, Icon, Tooltip, message, Button } from 'antd'

const AuthenticationButton = () => {
  const [user, loading, error] = useAuthState()
  const { isAnonymous, displayName, photoURL } = user
<<<<<<< HEAD
  const [click, toggle] = useToggle(false)
=======
  const [click, toggleClick] = useState(false)
>>>>>>> master1

  const profilePic = photoURL ? (
    <Avatar
      src={photoURL}
<<<<<<< HEAD
      onClick={toggle}
=======
      onClick={() => toggleClick(!click)}
>>>>>>> master1
      style={{
        position: 'absolute',
        top: '0',
        right: '20px'
      }} />
  ) : (
    <Avatar
      style={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
        position: 'absolute',
        top: '0',
        right: '20px'
      }}
<<<<<<< HEAD
      onClick={toggle}>
=======
      onClick={() => toggleClick(!click)}>
>>>>>>> master1
      {displayName ? displayName[0] : ''}
    </Avatar>
  )

  if (error) {
    message.error('Error signing in.')
  }
  if (loading) {
    return (
      <div className='authentication'>
        <Icon
          type='loading'
          style={{
            color: 'white',
            fontSize: '20px'
          }} />
      </div>
    )
  } else {
    return (
      <div className='authentication'>
        {isAnonymous ? (
          <Button onClick={login}>Login With Google</Button>
        ) : (
          <div style={{ width: '54px', height: '30px' }}>
            <Tooltip title={displayName} placement='leftBottom'>
              <div className='profile'>{profilePic}</div>
            </Tooltip>
            <Button
              className={`logout${click ? '-visible' : ''}`}
              onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default AuthenticationButton
