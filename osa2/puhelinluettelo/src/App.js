import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(newName)) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        updateNumber(persons.find(person => person.name.includes(newName)).id)
      }
    }
    else {
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
      })
    }
  }

  const updateNumber = id => {
    const person = persons.find(n => n.id === id)
    const changedPerson = {...person, number: newNumber}

    personsService
      .updateNumber(id ,changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
  }

  const deletePerson = id => {
    const personToDelete = persons.find(n => n.id === id ).name
    if (window.confirm(`Delete ${personToDelete} ?`)) {
      personsService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    if (event.target.value !== '') {
      setShowAll(false)
      setNewFilter(event.target.value)
    }
    else {
      setShowAll(true)
      setNewFilter(event.target.value)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson} 
        nameValue={newName} 
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} showAll={showAll} deletePerson={deletePerson} />
    </div>
  )
}

export default App