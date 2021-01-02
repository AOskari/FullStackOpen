import React from 'react'
import personService from '../services/Persons'

const RemovePerson = ({id, setPersons, name, setMessage, setErrorStyle}) => {
  
  const remove = () => {
    if (window.confirm(`Delete ${name}?`)){
      personService
      .remove(id)
      .then(() => {
        personService
        .getAll()
        .then(response => {
          setPersons(response.data)
          
          setErrorStyle({
            backgroundColor: 'red',
            color: 'white'
          })
          
          setMessage(`${name} has been removed from the phonebook!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)

          console.log(`removed person`)
        })         
      })
    } 
  } 
  
  return (
    <span>
      <button onClick={() => remove()}>delete</button>
    </span>
  )
}

export default RemovePerson