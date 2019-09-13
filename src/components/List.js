import { Droppable, Draggable } from 'react-beautiful-dnd'
import ItemCollection from './ItemCollection'
import React from 'react'

const List = ({ uid, collectionList }) => {
  return (
    <Droppable droppableId={uid} type='LIST'>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'wrap'
          }}>
          {collectionList &&
            collectionList.map((collection, index) => (
              <Draggable
                key={collection.id}
                draggableId={collection.id}
                index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <ItemCollection
                      key={collection.id}
                      uid={uid}
                      {...collection} />
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default List
