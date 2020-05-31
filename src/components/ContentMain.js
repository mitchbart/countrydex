import React from 'react'
import FullDetail from './FullDetail'
import CountryCard from './CountryCard.js'

export default function ContentMain({ countriesToShow, showOne, setShowOne, countryData }) {
  if (showOne) {
    //console.log(showOne)
    return (
      <FullDetail
        countryData={countryData}
        showOne={showOne}
        setShowOne={setShowOne}
      />
    )
  }
  if (countriesToShow.length === 0) {
    return (
      <div>No results matching your search</div>
    )
  }
  return (
    <div className="grid-body">
      {/* <ul> */}
        {countriesToShow.map(country => 
          <CountryCard
            key={country.name}
            country={country}
            setShowOne={setShowOne}
          />
          // <li key={country.name}>
          //   {country.name} 
          //   <button onClick={() => setShowOne(country)}>more info</button>
          // </li>
        )}
      {/* </ul> */}
    </div>
  )
}