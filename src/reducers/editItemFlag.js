import * as actionType from '../constants/constants'

const  editItemFlag = (state = [], action)=> {
    switch(action.type){
        case actionType.EDIT_ITEM:
            state.map(todo => 
                todo.id === action.id ? 
                    {...todo, editing : !todo.editing }:
                     todo)
        }
    }

export default editItemFlag