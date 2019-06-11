import React from 'react'
import { addItem } from '../firebase/collectionFunctions'

// props passed in: uid, collectionId
class NewItem extends React.Component {
  render () {
    let input
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              input.value = ' '
            }
            addItem(this.props.uid, this.props.collectionId, input.value)
            input.value = ''
          }}>
          <input
            className='addItem'
            type='text'
            ref={node => (input = node)}
            autoFocus={true} />
        </form>
      </div>
    )
  }
}

export default NewItem
