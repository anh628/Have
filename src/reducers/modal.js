import { MODAL_STATUS } from '../constants/constants'

const modal = (state = { open: false }, action) => {
  switch (action.type) {
    case MODAL_STATUS:
      return (state = { open: !state.open })
    default:
      return state
  }
}

export default modal
