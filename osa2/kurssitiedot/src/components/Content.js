import React from 'react'
import Part from './Part'
import { nanoid } from 'nanoid';

const Content = ({ parts }) => {
  return(
    <div>  
      {parts.map( part =>
        <Part key={nanoid()} part={part} />
      )}
    </div>
  )
}

export default Content