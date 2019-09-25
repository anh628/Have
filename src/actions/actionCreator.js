import { TOGGLE_MODAL_STATUS, SET_MODAL_IDS } from '../utils/constants'

export const toggleModalStatus = modalId => ({
  type: TOGGLE_MODAL_STATUS,
  modalId
})

export const setModalIds = modalIds => ({
  type: SET_MODAL_IDS,
  modalIds
})
