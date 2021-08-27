import { useState, useEffect } from "react";
import axios from "axios";

const WeatherDisplay = ({ country, weather }) => {
  if (weather === null) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>
        <b>temperature:</b> {weather.temperature} Celsius
      </div>
      <img src={weather.icon} alt="" height="70" />
      <div>
        <b>wind:</b> {weather.windSpeed} mph direction {weather.windDirection}
      </div>
    </div>
  );
};

const CountryDisplay = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`;
    axios.get(url).then(({ data }) => {
      setWeather({
        temperature: data.current.temperature,
        windSpeed: data.current.wind_speed,
        windDirection: data.current.wind_dir,
        icon: data.current.weather_icons[0],
      });
    });
  }, [country]);

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flag} height="100" alt={`Flag of ${country.name}`} />
      <WeatherDisplay country={country} weather={weather} />
    </div>
  );
};

const CountryListDisplay = ({ countries, handleClick }) => (
  <div>
    {countries.map(country => (
      <div key={country.name}>
        {country.name} <button onClick={() => handleClick(country.name)}>show</button>
      </div>
    ))}
  </div>
);

const TooManyMessage = () => <div>Too many matches, specify another filter</div>;

const ResultDisplay = ({ countries, handleShowClick }) => {
  if (countries.length === 0) {
    return null;
  }

  if (countries.length === 1) {
    return <CountryDisplay country={countries[0]} />;
  }

  if (countries.length <= 10) {
    return <CountryListDisplay countries={countries} handleClick={handleShowClick} />;
  }

  return <TooManyMessage />;
};

export default ResultDisplay;
