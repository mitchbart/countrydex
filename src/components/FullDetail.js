import React, { useEffect } from 'react'
import CountryCard from './CountryCard'
import Map from './Map'
import Footer from './Footer'

export default function FullDetail({ showOne, setShowOne, countryData }) {

  console.log(showOne)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const neighbors = showOne.borders
  const options = { //options below are sent to Map component
    center: { lat: showOne.latlng[0], lng: showOne.latlng[1] },
    zoom: 5,
  }

  return (
    <div>
      <button onClick={() => setShowOne("")}>return to search</button>
      <h2>{showOne.name}</h2>
      <h3>{showOne.alpha2Code} | {showOne.alpha3Code}</h3>
      <img src={showOne.flag} alt={showOne.name} height="120px"/>

      {showOne.altSpellings.length > 1 && 
        <div>
          <p>Alternate names</p>
          <ul>
            {showOne.altSpellings.slice(1).map(name => <li key={name}>{name}</li>)}
          </ul>
        </div>
      }

      <p>Population: {showOne.population.toLocaleString()}</p>
      <p>Region: {showOne.region}</p>
      <p>Subregion: {showOne.subregion}</p>
      <p>Capital: {showOne.capital}</p>
      <p>Demonym: {showOne.demonym}</p>

      {showOne.languages.length === 1 && <p>Language: {showOne.languages[0].name}</p>}
      {showOne.languages.length > 1 && 
        <div>
          <p>Languages</p>
          <ul>
            {showOne.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
          </ul>
        </div>
      }

      {showOne.currencies.length === 1 && <p>Currency: {showOne.currencies[0].name} | {showOne.currencies[0].code} | {showOne.currencies[0].symbol}</p>}
      {showOne.currencies.length > 1 && 
        <div>
          <p>Local currencies</p>
          <ul>
            {showOne.currencies.map(currency => <li key={currency.code}>{currency.name} | {currency.code} | {currency.symbol}</li>)}
          </ul>
        </div>
      }

      {showOne.timezones.length === 1 && <p>Timezone: {showOne.timezones[0]}</p>}
      {showOne.timezones.length > 1 && 
        <div>
          <p>Timezones</p>
          <ul>
            {showOne.timezones.map(timezone => <li key={timezone}>{timezone}</li>)}
          </ul>
        </div>
      }

      <Map
        options={options}
      />

      {showOne.borders.length > 0 && 
        <div>
          <h3>{showOne.name} shares a border with:</h3>
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
      <button onClick={() => setShowOne("")}>return to search</button>
      <Footer />
    </div>
  )
}