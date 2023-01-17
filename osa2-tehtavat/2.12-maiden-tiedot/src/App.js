import { useState, useEffect } from 'react';

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState([]);

  const fetchCountries = async () => {
    try {
      const result = await fetch('https://restcountries.com/v3.1/all');
      const data = await result.json();
      
      setAllCountries(data);
    }
    catch (err) {
      console.log(err);
    };
  }
  const fetchWeather = async () => {
    try {
      const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${countries[0].capitalInfo.latlng[0]}&lon=${countries[0].capitalInfo.latlng[1]}&lang=fi&appid=${process.env.REACT_APP_API_KEY}`);
      const data= await result.json();

      setWeather(data);
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!search) return setCountries([]);
    
    const countriesToShow = allCountries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()));

    setCountries(countriesToShow);
    fetchWeather();
  }, [search]);
  return (
   <>
    <div>
      Search countries <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
    <div>
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
      {countries.length === 1 && (
        <>
          <h2>{countries[0].name.common}</h2>
          <p>capital: {countries[0].capital}</p>
          <p>area: {countries[0].area}</p>

          <h3>languages</h3>
          <ul>
            {Object.values(countries[0].languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={countries[0].flags.png} width='150px' ></img>
          <h2>Weather in {countries[0].capital}</h2>
          <p>temperature: {(weather?.main?.temp - 272).toFixed(2)} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} height='100px' alt='' />
          <p>wind: {weather?.wind.speed} m/s</p>
        </>
      )}
      {countries.length > 1 && countries.length <= 10 && ( 
        <>
            {countries.map(country => (
                <p key={country.area}>
                  {country.name.common} <button onClick={() => setCountries([country])}>show</button>
                </p>
            ))}
        </>
      )}
    </div>
   </>
  );
}

export default App;
