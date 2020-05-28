import React from 'react'
import CountryCard from './CountryCard'

export default function FullDetail({ showOne, setShowOne, countryData }) {
  console.log(showOne)
  const neighbors = showOne.borders
  console.log(neighbors)
  //console.log(showOne.languages.length)
  return (
    <div>
      <button onClick={() => setShowOne("")}>back</button>
      <h2>{showOne.name}</h2>
      <h3>{showOne.alpha2Code} | {showOne.alpha3Code}</h3>
      <img src={showOne.flag} alt={showOne.name} height="120px"/>
      <p>Population: {showOne.population.toLocaleString()}</p>
      <p>Region: {showOne.region}</p>
      <p>Subregion: {showOne.subregion}</p>
      <p>Capital: {showOne.capital}</p>

      {showOne.languages.length === 1 && <p>Language: {showOne.languages[0].name}</p>}
      {showOne.languages.length > 1 && 
        <div>
          <p>Languages</p>
          <ul>
            {showOne.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
          </ul>
        </div>
      }

      {showOne.currencies.length === 1 && <p>Currency: {showOne.currencies[0].name} | {showOne.currencies[0].symbol}</p>}
      {showOne.currencies.length > 1 && 
        <div>
          <p>Languages</p>
          <ul>
            {showOne.currencies.map(currency => <li key={currency.code}>{currency.name} | {currency.symbol}</li>)}
          </ul>
        </div>
      }

      {showOne.borders.length > 0 && 
        <div>
          <h3>Bordering countries</h3>
          {
            countryData
              .filter(country => neighbors.includes(country.alpha3Code))
              .map(country => 
                <CountryCard
                  key={country.name}
                  country={country}
                  setShowOne={setShowOne}
                />
              )
          }

        </div>
      }
    </div>
  )
}