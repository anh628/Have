import { MODAL_STATUS } from '../constants/constants'

export const toggleModalStatus = modalId => ({
  type: MODAL_STATUS,
  modalId
}