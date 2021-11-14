import React from 'react'
import axios from 'axios'

const WeatherData = ({ city, weatherData, updateWeather }) => {
  const api_key = process.env.REACT_APP_API_KEY

  axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`)
      .then(response => {
        console.log('promise2 fulfilled')
        updateWeather(response.data)
  })

  if (Object.keys(weatherData).length !== 0) {
    console.log(weatherData)
    return(
      <div>
        <h2>Weather in {city}</h2>
        <div><b>temperature:</b> {weatherData.current.feelslike_c} Celsius</div>
        <img src={weatherData.current.condition.icon} alt="weather" />
        <div><b>wind:</b> {weatherData.current.wind_mph} mph direction {weatherData.current.wind_dir}</div>
      </div>
    )
  }
  return(
    <div></div>
  )
}

const Countries = ({ countryData, weatherData, search, changeSearch, updateWeather }) => {
  const filteredData = countryData.filter( country => 
    country.name.common.toLowerCase().includes(search.toLowerCase()))

  

  console.log(filteredData)
  console.log(weatherData)


  if (filteredData.length > 10) {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (filteredData.length > 1) {
    return(
      <div>
        {filteredData.map(country =>
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => changeSearch(country.name.common)}>show</button>
          </div>
        )}
      </div>
    )
  }
  else if (filteredData.length === 1) {
    return(
      <div>
        <h1>{filteredData[0].name.common}</h1>
        <div>capital {filteredData[0].capital}</div>
        <div>population {filteredData[0].population}</div>
        <h2>Spoken languages</h2>
        <ul>
          {Object.entries(filteredData[0].languages).map( lang => 
            <li key={lang[0]}>{lang[1]}</li>
          )}
        </ul>
        <img src={filteredData[0].flags.png} alt="flag" />
        <WeatherData city={filteredData[0].capital} weatherData={weatherData} updateWeather={updateWeather} />
      </div>
    )
  }
  else {
    return(
      <div>
        No results
      </div>
    )
  }
}

export default Countries