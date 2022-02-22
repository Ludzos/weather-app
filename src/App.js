import React from 'react'
import { useState } from 'react';



const api = {
key: "98d195ebe7dad4541e18e3bb96432afb",
base:"https://api.openweathermap.org/data/2.5/"
}

function App() {

    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const search = evt => {
      if (evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
          });
      }
    }

    const dateBuilder = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
      "Friday", "Saturday"];

      let day = days[d.getDay()]
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;

    }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 15) ? 'App warm' : 'App') : 'App'}>
    
    <div className="header">
      <h1 className="cloud-text">Weather App</h1>
      <p className="seach-by">Search By Country/City.</p>
    </div>
          
    <main>
        <div className="search-box">
          <input
            className="Search-bar" 
            type="text" 
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} 
            >    
          </input>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>          
          </div>

          <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
     
    </div>
  );
}

export default App;
