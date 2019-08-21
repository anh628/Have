import {
  TOGGLE_MODAL_STATUS,
  ADD_MODAL_ID,
  DELETE_MODAL_ID,
  CLEAR_MODAL_ID
} from '../constants/constants'

const modal = (state = [], action) => {
  let modals
  switch (action.type) {
    case ADD_MODAL_ID:
      modals = [...state]
      modals.push({ modalId: action.modalId, open: false })
      return modals
    case DELETE_MODAL_ID:
      modals = [...state]
      modals = modals.filter(modal => modal.modalId !== action.modalId)
      return modals
    case CLEAR_MODAL_ID:
      return []
    case TOGGLE_MODAL_STATUS:
      modals = [...state]
      modals = modals.map(modal =>
        modal.modalId === action.modalId
          ? { ...modal, open: !modal.open }
          : modal
      )
      return modals
    default:
      return state
  }
}

export default modal
