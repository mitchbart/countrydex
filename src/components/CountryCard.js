import React from 'react'

export default function CountryCard({ country, setShowOne }) {
  return (
    <div className="card" key={country.name}>
      <div className="card-content">
        <div className="card-title">
          <div className="title-name">
            <h3>{country.name}</h3>
          </div>
          <div className="title-alpha">
            <div className="alpha2">
              <h3>{country.alpha2Code}</h3>
            </div>
            <div className="alpha3">
              <h3>{country.alpha3Code}</h3>
            </div>
          </div>
          

        </div>
        
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