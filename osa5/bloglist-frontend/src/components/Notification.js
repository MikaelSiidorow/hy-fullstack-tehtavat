import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const notificationBoxStyle = {
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  }

  return (
    <div style={notificationBoxStyle} className="error">
      {message}
    </div>
  )
}

export default Notification