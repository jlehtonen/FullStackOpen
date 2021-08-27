const CountryDisplay = ({ country }) => (
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
  </div>
);

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
