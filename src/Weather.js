import React, { useState } from 'react'
import axios from 'axios'
import './Weather.css'

const api = {
    key: "5afd2b0682d0a88a16a8b059b6dfe07e",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [query,setQuery] = useState('')
    const [weather,setWeather] = useState({})
    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    const search = async (e) => {
        if(e.key==='Enter'){
            const response = await axios.get(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
            console.log(response.data);
            setWeather(response.data)
            setQuery('')
        }
    }
    const datebuilder = (d) => {
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        const day = days[d.getDay()]
        const month = months[d.getMonth()]
        const date = d.getDate()
        const year = d.getFullYear()
        return `${day} ${date} ${month} ${year}`
    }
  return (
    <div className={(typeof weather.main!=="undefined") ? ((weather.main.temp>16) ? 'app-warm' : 'app-cold') : 'app-cold'}>
        <main>
            <div className="search-box">
                <input type="text" 
                className='search-bar'
                placeholder='Search...'
                value={query}
                onChange={handleChange}
                onKeyPress={search}/>
            </div>
            {typeof weather.main!=="undefined" ? (
                <div className="location-box">
                    <div className="location">
                        {weather.name},{weather.sys.country}
                        <div className="date">
                            {datebuilder(new Date())}
                        </div>
                    </div>
                    <div className="weather-box">
                        <div className="temp">
                            {Math.round(weather.main.temp)}°C
                        </div>
                        <div className="weather-type">
                            {weather.weather[0].main}
                        </div>
                    </div>
                </div>
            ) : (
                <p></p>
            )}
            
        </main>
    </div>
  )
}

export default Weather