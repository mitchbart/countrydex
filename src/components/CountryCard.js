import React from 'react'

export default function CountryCard({ country, setShowOne }) {
  return (
    <li key={country.name}>
      {country.name} 
      <button onClick={() => setShowOne(country)}>more info</button>
      <img src={country.flag} alt={country.name} height="12px"/>
    </li>
  )
}