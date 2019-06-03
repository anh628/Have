import * as actionType from '../constants/constants'

const  editItemFlag = (state = [], action)=> {
    switch(action.type){
        case actionType.EDIT_ITEM_FLAG:
            state.map(item => 
                item.id === action.id ? 
                    {...items, editing : !item.editing }:
                     item)
        }
    }

export default editItemFlag