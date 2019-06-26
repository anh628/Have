import React from 'react'
import reactCSS from 'reactcss'
import { GithubPicker } from 'react-color'
import { editColor } from '../firebase/collectionFunctions'

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
    editColor(this.props.uid, this.props.collectionId, color)
  }

  render () {
    const styles = reactCSS({
      default: {
        color: {
          width: '15px',
          height: '15px',
          borderRadius: '1px',
          background: `${this.props.color}`
          // I think ^ this should be this.props.color.hex to make sure the color picker box is the same color as the rest of the
          // collection but if I do that, I get a TypeError: Cannot read property Hex of undefined
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
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
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <GithubPicker
              colors={['#FACBCD', '#FBE0A8', '#CAE5C3', '#BCDBEC', '#FFFFFF']}
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
