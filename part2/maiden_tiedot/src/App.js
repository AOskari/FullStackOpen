import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilterValue] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise complete')
        setCountries(response.data.filter(country => country.name.includes(newFilter)))
      })
  }, [newFilter])
  console.log('render', countries.length, 'countries')

  const inputChange = (event) => {
    event.preventDefault()
    setFilterValue(event.target.value)
  }

  return (
    <div>
      <p>find countries<input onChange={inputChange}/></p>
  
      <Countries countries={countries} filterValue={newFilter} changeFilter={setFilterValue}/>
    </div>
  )
}

export default App