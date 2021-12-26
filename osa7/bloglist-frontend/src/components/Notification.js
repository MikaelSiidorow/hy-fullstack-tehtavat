import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.error ? 'red' : 'green',
    background: 'lightgrey'
  }

  if (notification.message !== '') {
    return (
      <div style={style}>
        {notification.message}
      </div>
    )
  }
  return null
}

export default Notification