import React from 'react'

export default function ContentMain({ countriesToShow, showOne, setShowOne }) {

  if (showOne) {
    console.log(showOne)
    return (
      <div>
        <button onClick={() => setShowOne("")}>back</button>
        <h1>{showOne.name}</h1>
        <p>{showOne.population}</p>
      </div>
    )
  }
  if (countriesToShow.length === 0) {
    return (
      <div>No results</div>
    )
  }
  return (
    <div>
      <ul>
        {countriesToShow.map(country => 
          <li key={country.name}>
            {country.name} 
            <button onClick={() => setShowOne(country)}>more info</button>
          </li>
        )}
      </ul>
    </div>
  )
}