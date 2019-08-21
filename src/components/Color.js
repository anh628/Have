import React from 'react'
import reactCSS from 'reactcss'
import { GithubPicker } from 'react-color'
import { editColor } from '../firebase/collectionFunctions'
import { COLOR_CHOICES } from '../constants/constants'
import { Icon, Tooltip } from 'antd'
class Color extends React.Component {
  state = {
    displayColorPicker: false
  }

  handleClick = () => {
    // when the color picker is clicked, change the value of displayColorPicker so that the color palette opens up
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    // after the color is selected from the color palette, make displayColorPicker false again
    this.setState({ displayColorPicker: false })
  }

  handleChange = color => {
    editColor(this.props.uid, this.props.collectionId, color.hex)
  }

  render () {
    const styles = reactCSS({
      default: {
        color: {
          width: '15px',
          height: '15px',
          borderRadius: '1px',
          background: `${this.props.color}`
        },
        popover: {
          position: 'absolute',
          zIndex: '2'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }
    })

    return (
      <div className='colorPickerPosition '>
        <Tooltip title='Change list color' placement='bottom'>
          <div style={styles.swatch} onClick={this.handleClick}>
            <Icon type='bg-colors' />
          </div>
        </Tooltip>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <GithubPicker
              colors={COLOR_CHOICES}
              width='140px'
              color={this.props.collectionColor}
              onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    )
  }
}

export default Color
