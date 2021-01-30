import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  console.log('useCountry called')
  useEffect(() => {
    console.log('useEffect called')
   axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
    .then(res =>  {
      setCountry(res.data)
    })
     .catch(err => {
       console.log(err.message)
     })
  }, [name])
  console.log(country)

  if (country === null) {
    return country
  } else {
    return country[0]
  }
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    console.log('Setting name to ', name)
  }

  console.log(country)

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App