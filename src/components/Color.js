import React from 'react'
import reactCSS from 'reactcss'
import { GithubPicker } from 'react-color'
import { editColor } from '../firebase/collectionFunctions'
import Emoji from './Emoji'
import { COLOR_CHOICES } from '../constants/constants'

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
        swatch: {
          padding: '5px',
          background: 'transparent',
          borderRadius: '1px',
          display: 'inline-block',
          cursor: 'pointer'
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
      <div className='colorPickerPosition'>
        <div style={styles.swatch} onClick={this.handleClick}>
          <Emoji symbol='🎨' label='colorChanger' />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <GithubPicker
              colors={COLOR_CHOICES}
              width='130px'
              color={this.props.collectionColor}
              onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    )
  }
}

export default Color
