import React from 'react'
import Person from './Person'



const Persons = ({ persons, filter, showAll, deletePerson }) => {
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {personsToShow.map(person =>
      <Person 
        key={person.id} 
        person={person} 
        deletePerson={() => deletePerson(person.id)} 
      /> 
    )}
    </div> 
  )
}

export default Persons