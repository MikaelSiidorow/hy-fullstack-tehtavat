import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [ countryData, setCountryData ] = useState([])
  const [ weatherData, setWeatherData ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise1 fulfilled')
        setCountryData(response.data)
      })
     
  }, [])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)   
  }

  return (
    <div>
      find countries
      <input value={newSearch} onChange={handleSearch} />
      <Countries 
        countryData={countryData} 
        weatherData={weatherData}
        updateWeather={setWeatherData}
        search={newSearch} 
        changeSearch={setNewSearch}
      />
    </div>
  )
}

export default App