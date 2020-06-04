import React from 'react'

export default function CountryCard({ country, setShowOne }) {
  return (
    <div className="card" key={country.name}>
      <div className="card-content">
        <h3>{country.name}</h3>
        <div>
          <img className="card-flag" src={country.flag} alt={country.name} height="80px"/>
        </div>
        <div>
          <p>Region: {country.region}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          {country.capital && <p>Capital: {country.capital}</p>}
          <button onClick={() => setShowOne(country)}>more info</button>
        </div>
      </div>
    </div>
  )
}