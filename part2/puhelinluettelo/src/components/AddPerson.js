import React from 'react'
import personService from '../services/Persons'


const AddPerson = ({persons, setPersons, newName, newNumber, setMessage, setErrorStyle}) => {

  const addPerson = {
    name: newName,
    number: newNumber
  }

  const add = () => {
    if (!persons.some(person => person.name === newName) && newName !== ''){
      personService
        .create(addPerson)
        .then(response => {
          setPersons(persons.concat(response.data))

          setErrorStyle({
            backgroundColor: 'green',
            color: 'white'
          })
          setMessage(`${newName} has been added to the phonebook!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorStyle({
            backgroundColor: 'red',
            color: 'white'
          }) 
          console.log(error.response.data)
          setMessage(JSON.stringify(error.response.data))
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

    } else if (!persons.some(person => person.number === newNumber) && newNumber !== '' 
    && window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      personService  
      .update(persons.filter(person => person.name.includes(newName))[0].id, {name: newName, number: newNumber})
      .then(() => {
        personService
        .getAll()
        .then(response => {
          setErrorStyle({
            backgroundColor: 'blue',
            color: 'white'
          })        
          setMessage(`The number of ${newName} has been changed.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(response.data)
          console.log(`${newName} number has been changed.`)
        })
      })
      .catch(error => {
        setErrorStyle({
          backgroundColor: 'red',
          color: 'white'
        })        
        setMessage(`${newName} has already been removed from the server!`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        console.log(error)
      })
      
    } else {
      setErrorStyle({
        backgroundColor: 'yellow',
        color: 'black'
      })

      setMessage(`${newName} is already in the phonebook.`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <button type='button' onClick={() => add()}>add</button>
  )
}


export default AddPerson