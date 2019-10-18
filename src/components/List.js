import { Droppable } from 'react-beautiful-dnd'
import ItemCollection from './ItemCollection'
import { omit } from 'lodash'
import React from 'react'

const List = ({ uid, orderCollection }) => {
  return (
    <div
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
      {orderCollection &&
        orderCollection.map((row, index) => {
          return (
            <Droppable
              key={index}
              droppableId={`droppable ${index}`}
              type='overview'
              direction='horizontal'>
              {provided => (
                <div ref={provided.innerRef}>
                  {row.map((collection, index) => (
                    <ItemCollection
                      dragIndex={index}
                      key={collection.id}
                      uid={uid}
                      {...omit(collection, ['index', 'timeStamp'])} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )
        })}
    </div>
  )
}

export default List
