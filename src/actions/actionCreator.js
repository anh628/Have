import {
  TOGGLE_MODAL_STATUS,
  ADD_MODAL_ID,
  DELETE_MODAL_ID,
  CLEAR_MODAL_ID
} from '../constants/constants'

export const toggleModalStatus = modalId => ({
  type: TOGGLE_MODAL_STATUS,
  modalId
})

export const addModalId = modalId => ({
  type: ADD_MODAL_ID,
  modalId
})

export const deleteModalId = modalId => ({
  type: DELETE_MODAL_ID,
  modalId
})

export const clearModalId = () => ({
  type: CLEAR_MODAL_ID
})
