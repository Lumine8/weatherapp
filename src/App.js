import './App.css';

import React,{ useState } from 'react';

const api = {
  key: "5f285d33be01b937453b7e1688fc75ee",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }


  const dateBuilder = (d) =>{
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
  }

  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

  return (
    <div className={(typeof weather.main != "undefined")? ((weather.main.temp > 9) ? ((weather.weather[0].main == 'Rain')? 'app rain': ((weather.weather[0].main == 'Clouds')? 'app clouds': 'app warm')) : 'app'): 'app'}>
      <main>
        <div className='search-box'>
          <input type="text" className='search-bar' placeholder='Search...' onChange={e => setQuery(e.target.value)} value={query} onKeyDown={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div><div className='loaction-box'>
          <div className='location'>
            {weather.name}, {weather.sys.country}
            </div>
          <div className='date'>{dateBuilder(new Date())}</div>
          
          <div className='weather-box'>
            <div className='temp'>{Math.round(weather.main.temp)}°c
            <div className='weather-small'>Humidity: {weather.main.humidity}% <br/> Wind: {round(weather.wind.speed,1)}km/h</div>
            <div className='weather-small'></div>

            </div>
            

            <div className='weather'>{weather.weather[0].description}</div>
          </div>
        </div> </div>): ('')}

      </main>
    </div>
  );
}

export default App;
