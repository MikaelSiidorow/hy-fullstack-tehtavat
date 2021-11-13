import React from 'react'
import Person from './Person'



const Persons = ({ persons, filter, showAll }) => {
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {personsToShow.map(person =>
      <Person key={person.name} name={person.name} number={person.number} />  
    )}
    </div> 
  )
}

export default Persons