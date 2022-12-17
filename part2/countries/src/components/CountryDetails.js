export default function CountryDetails({ country }) {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <div>
        <h4>languages:</h4>

        <ul>
          {Object.values(country.languages).map((language) => (
            <li>{language}</li>
          ))}
        </ul>
      </div>

      <img src={country.flags.png} alt="country flag" />
    </div>
  );
}
