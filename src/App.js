import React,{ useState } from 'react';
import './App.css';
const api={
  key:"db7eac7f3497bcef3b9addb7703887be",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({});

  const search=evt =>{
    if(evt.key=="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setQuery('');
        setWeather(result);
        console.log(result);
      });
    }
  }

  const dateBuilder=(d)=>{
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    let days=["Sunday","Monday","Tuesday","Wednessday","Thursday","Friday","Saturday"]

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return(
    <div classname="App">
      <main>
        <div class="Searchbox">
          <input type="text" class="search-text-box" placeholder="Search.." 
          onChange={e => setQuery(e.target.value)} 
          value={query}
          onKeyPress={search} />
        </div>
        {(typeof weather.main!="undefined")?(
        <div><div class="location-box" id="refresh">
          <div class="location">{weather.name},{weather.sys.country}</div>
          <div class="date">{dateBuilder(new Date())}</div>
        </div>
        <div class="weather-box">
          <div class="weather">{Math.round(weather.main.temp)}°c</div>
          <div class="forecast">{weather.weather[0].main}</div> 
          <div class="M-temp">Max:{Math.round(weather.main.temp_max)}°c</div>
          <div class="M-temp">Min:{Math.round(weather.main.temp_min)}°c</div>
          <div class="info">Humidity:{weather.main.humidity}%</div>
        </div>
        </div>
        ):('')}
      </main>
    </div>
  )
}

export default App;
