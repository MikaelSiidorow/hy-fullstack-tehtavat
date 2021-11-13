import React from 'react'

const Total = ({ parts }) => {
  return (
    <b>total of {parts.map( part => part.exercises ).reduce( (s,p) => s + p) } exercises</b>
  )
}

export default Total