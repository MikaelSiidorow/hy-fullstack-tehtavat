import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT':
    return action.data
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default: return state
  }
}

export const retrieveUserFromStorage = () => {
  return {
    type: 'INIT',
    data: storage.loadUser()
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      storage.saveUser(user)
      dispatch(setNotification(`${user.name} welcome back!`, false, 5))
      dispatch({
        type: 'LOGIN',
        data: user
      })

    } catch(exception) {
      dispatch(setNotification('wrong username/password', true, 5))
    }
  }
}

export const logout = () => {
  storage.logoutUser()
  return {
    type: 'LOGOUT'
  }
}

export default userReducer