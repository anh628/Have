import * as actionType from '../constants/constants'

const editItemFlag = (state = [], action) => {
  switch (action.type) {
    case actionType.EDIT_ITEM_FLAG:
      let item = { ...action.item }
      item = { ...item, editing: !action.item.editing }
      return item
    default:
      return state
  }
}
export default editItemFlag
