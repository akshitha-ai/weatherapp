import './App.css';
import React, { useState } from 'react';
import Currentweather from './components/currentweather/curweather.js';
import Search from './components/search/Search';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import Forecast from './components/Forecast/Forecast';

function App() {
  const [currentweather, setcurrentweather] = useState(null);
  const [currentforecast, setforecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log("searchdata" , searchData)
    const [lat, lon] = searchData.value.split('').map(coord => coord.trim());
    // console.log("lat", lat)
    // console.log("lon", lon)
    const currentweatherfetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units= metric`);
    const forecastfetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units= metric`);

    Promise.all([currentweatherfetch, forecastfetch])
      .then(async (responses) => {
        const weatherResponse = await responses[0].json();
        const forecastResponse = await responses[1].json();

        setcurrentweather({ city: searchData.label, ...weatherResponse });
        setforecast({ city: searchData.label, ...forecastResponse });

      })
      .catch((err) => console.log(err));

  }

  console.log("weather", currentweather);
  console.log("forecast", currentforecast);

  return (
    <div className='app'>
      <Search onSearchChange={handleOnSearchChange} />
      {currentweather && <Currentweather data={currentweather} />}
      {currentforecast && <Forecast data = {currentforecast}/>}
    </div>
  );
}

export default App;
