import { TOGGLE_MODAL_STATUS, SET_MODAL_IDS } from '../utils/constants'

const modal = (state = [], action) => {
  let modals
  switch (action.type) {
    case SET_MODAL_IDS:
      modals = [...state]
      modals = action.modalIds.map((modalId, i) =>
        modals[i] && modals[i].modalId === modalId
          ? { ...modals[i] }
          : { modalId, open: false }
      )
      return modals
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
