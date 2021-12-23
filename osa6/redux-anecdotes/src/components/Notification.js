import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification !== '') {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  return null
}

export default connect(
  state => ({notification: state.notification})
)(Notification)