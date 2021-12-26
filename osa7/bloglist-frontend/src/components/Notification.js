import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const notificationType = notification.error ? 'danger' : 'success'

  if (notification.message !== '') {
    return (
      <div className='container'>
        <Alert variant={notificationType}>
          {notification.message}
        </Alert>
      </div>
    )
  }
  return null
}

export default Notification