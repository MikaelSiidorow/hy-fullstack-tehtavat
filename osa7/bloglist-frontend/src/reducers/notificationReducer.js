const notificationReducer = (state = { error: false, message: '' }, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return { error: action.error, message: action.message }
  case 'RESET_NOTIFICATION':
    return { error: false, message: '' }
  default:
    return state
  }
}

let prevTimeoutID

export const setNotification = (message, error, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      error,
      message
    })
    clearTimeout(prevTimeoutID)
    prevTimeoutID = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, 1000 * timeout)
  }
}

export default notificationReducer