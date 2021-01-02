import React from 'react'
import RemovePerson from './RemovePerson'

const FilterInput = ({setFilterValue}) => {
  return (
    <div>
      <p>filter shown with</p>
      <input onChange={event => setFilterValue(event.target.value)}/>
    </div>
  )
}

const Filter = ({persons, filterValue, setPersons, setErrorStyle, setMessage}) => {
  return (
    <div>
        {persons.filter(person => person.name.includes(filterValue)).map((filteredPerson, i)=> (
          <p key={i}>{filteredPerson.name} {filteredPerson.number}
          <RemovePerson id={filteredPerson.id} setPersons={setPersons} name={filteredPerson.name} 
          setErrorStyle={setErrorStyle} setMessage={setMessage}/></p>
        ))}
    </div>
  )
}

export {
  Filter,
  FilterInput
}