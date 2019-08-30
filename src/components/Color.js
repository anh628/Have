<<<<<<< HEAD
import React from 'react'
import { editColor } from '../firebase/collectionFunctions'
import { COLOR_CHOICES } from '../utils/constants'
import useToggle from '../hooks/useToggle'
import { Icon, Tooltip, Radio } from 'antd'

const Color = ({ uid, collectionId, collectionColor }) => {
  const [displayColorPicker, toggle] = useToggle(false)
=======
import React, { useState } from 'react'
import { editColor } from '../firebase/collectionFunctions'
import { COLOR_CHOICES } from '../constants/constants'
import { Icon, Tooltip, Radio } from 'antd'

const Color = ({ uid, collectionId, collectionColor }) => {
  const [displayColorPicker, toggleDisplayColorPicker] = useState(false)
>>>>>>> master1

  const colorButtons = (
    <Radio.Group
      style={{ display: 'inline-flex' }}
      onChange={e => {
        editColor(uid, collectionId, e.target.value)
<<<<<<< HEAD
        toggle()
=======
        toggleDisplayColorPicker(false)
>>>>>>> master1
      }}
      defaultValue={collectionColor}>
      {COLOR_CHOICES.map(color => (
        <Radio.Button
          key={`${collectionId}${color}`}
          value={color}
          style={{
            backgroundColor: color,
            border: '1px solid #484646'
          }}
          disabled={collectionColor === color} />
      ))}
    </Radio.Group>
  )

  return (
    <div className='colorPickerPosition '>
      <Tooltip title='Change list color' placement='top'>
<<<<<<< HEAD
        <div onClick={toggle}>
=======
        <div onClick={() => toggleDisplayColorPicker(!displayColorPicker)}>
>>>>>>> master1
          <Icon type='bg-colors' />
        </div>
      </Tooltip>
      <div>{displayColorPicker && colorButtons}</div>
    </div>
  )
}

export default Color
