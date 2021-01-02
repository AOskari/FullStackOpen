import React, { useState } from 'react'

const Weather = ({location}) => {

  const [weather, setWeather] = useState({})
  let weatherInfo = []
  const api_key = process.env.REACT_APP_API_KEY
  const axios = require('axios')
  const params = {
    access_key: api_key,
    query: location
  }

  axios.get('http://api.weatherstack.com/current', {params})
    .then(response => {
      weatherInfo = response.data;
      setWeather(response.data)
      const apiResponse = response.data;
      console.log(apiResponse)
    }).catch(error => {
      console.log(error)
    })

    console.log(weatherInfo, 'asdasd')

  return (
    <div>
      <h1>Weather in {weather.location.name}</h1>
      <b>temperature: </b> {weather.current.temperature} ℃
      <img alt='weather image' />
      <b>wind: </b> mph direction {weather.current.wind_dir}
    </div>
    )
}


export default Weather