import { useRef } from 'react'
import { debounce } from 'lodash'

export const useDebounce = (debounceFunc, durationInMs, option) => {
  return useRef(debounce(debounceFunc, durationInMs, option), [
    debounceFunc,
    durationInMs,
    option
  ]).current
}

export default useDebounce
