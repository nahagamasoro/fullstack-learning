import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';

function App() {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchedCountry, setSearchedCountry] = useState([]);
  const [countryDetails, setCountryDetails] = useState();

  const [weather, setWeather] = useState();

  const weatherApiKey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(
        `
https://api.openweathermap.org/data/2.5/weather?lat=${countryDetails?.capitalInfo.latlng[0]}&lon=${countryDetails?.capitalInfo.latlng[0]}&appid=${weatherApiKey}
    `
      )
      .then((response) => setWeather(response.data));
  }, [countryDetails]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    findCountry(value);
  };

  const findCountry = (value) => {
    const country = countries.filter((country) =>
      country?.name.common.toLowerCase().includes(value.toLowerCase())
    );

    setSearchedCountry(country);

    if (value === '') {
      setSearchedCountry(countries);
    }
  };

  const getDetails = () => {
    if (searchedCountry.length === 1) {
      return <CountryDetails country={searchedCountry[0]} />;
    }

    if (searchedCountry.length > 10) {
      return <p>To many matches, specify antherfilter.</p>;
    }

    if (countryDetails) {
      return <CountryDetails country={countryDetails} />;
    }

    if (searchedCountry.length <= 10) {
      return searchedCountry.map((country) => (
        <div key={country.name}>
          <p>{country.name.common}</p>

          <button onClick={() => setCountryDetails(country)}>show</button>
        </div>
      ));
    }
  };

  console.log('weather:', weather);

  return (
    <div>
      <p>
        find countries:
        <input
          type="text"
          value={inputValue}
          onChange={(event) => handleChange(event)}
        />
      </p>

      <div>{getDetails()}</div>
    </div>
  );
}

export default App;
