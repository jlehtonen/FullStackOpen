import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import ResultDisplay from "./components/ResultDisplay";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(
        response.data.map(country => ({
          name: country.name,
          capital: country.capital,
          population: country.population,
          languages: country.languages.map(language => language.name),
          flag: country.flag,
        }))
      );
    });
  }, []);

  const handleShowClick = countryName => {
    setFilter(countryName);
  };

  return (
    <div>
      <Filter value={filter} handleChange={({ target }) => setFilter(target.value)} />
      <ResultDisplay countries={filteredCountries} handleShowClick={handleShowClick} />
    </div>
  );
};

export default App;
