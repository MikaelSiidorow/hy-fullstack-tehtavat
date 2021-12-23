const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.text
    case 'RESET_NOTIFICATION':
      return ''
    default:
      return state
  }
}

let prevTimeoutID

export const setNotification = (text, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      text
    })
    clearTimeout(prevTimeoutID)
    prevTimeoutID = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, 1000*timeout)
  }
}

export default notificationReducer