import React, { useState, useEffect } from 'react'
import {FilterInput, Filter} from './components/Filter'
import Person from './components/Person'
import AddPerson from './components/AddPerson'
import personService from './services/Persons'
import Notify from './components/Notify'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setFilterValue] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ errorStyle, setErrorStyle ] = useState({})

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled', response.data)
        setPersons(response.data)     
      })
  }, [])

  console.log(newName)
  
  const inputChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  } 

  const numberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notify errorMessage={errorMessage} errorStyle={errorStyle}/>
      <form>
        <FilterInput setFilterValue={setFilterValue}/>
        <h2>add a new</h2>
        <Person name={inputChange} number={numberChange}/>
        <AddPerson persons={persons} setPersons={setPersons} newName={newName} 
        newNumber={newNumber} setMessage={setErrorMessage} setErrorStyle={setErrorStyle}/>
      </form>
      <h2>Numbers</h2>
      <Filter persons={persons} filterValue={newFilter} setPersons={setPersons} 
      setMessage={setErrorMessage} setErrorStyle={setErrorStyle}/>
    </div>
  )
}

export default App
