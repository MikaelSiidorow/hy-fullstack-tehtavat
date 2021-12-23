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

export const setNotification = text => {
  return {
    type: 'SET_NOTIFICATION',
    text
  }
}

export const removeNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default notificationReducer