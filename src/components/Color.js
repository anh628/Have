import React, { useState } from 'react'
import { editColor } from '../firebase/collectionFunctions'
import { COLOR_CHOICES } from '../utils/constants'
import { Icon, Tooltip, Radio } from 'antd'

const Color = ({ uid, collectionId, collectionColor }) => {
  const [displayColorPicker, toggleDisplayColorPicker] = useState(false)

  const colorButtons = (
    <Radio.Group
      style={{ display: 'inline-flex' }}
      onChange={e => {
        editColor(uid, collectionId, e.target.value)
        toggleDisplayColorPicker(false)
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
        <div onClick={() => toggleDisplayColorPicker(!displayColorPicker)}>
          <Icon type='bg-colors' />
        </div>
      </Tooltip>
      <div>{displayColorPicker && colorButtons}</div>
    </div>
  )
}

export default Color
