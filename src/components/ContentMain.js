import React from 'react'
import FullDetail from './FullDetail'
import CountryCard from './CountryCard.js'

export default function ContentMain({ countriesToShow, showOne, setShowOne, countryData, listView, setShowSidebar }) {
  if (showOne) {
    //console.log(showOne)
    return (
      <FullDetail
        countryData={countryData}
        showOne={showOne}
        setShowOne={setShowOne}
        setShowSidebar={setShowSidebar}
      />
    )
  }
  if (countriesToShow.length === 0) {
    return (
      <div>No results matching your search</div>
    )
  }

  if (listView) {
    return (
      <div>
        <ul>
        {countriesToShow.map(country => 
          <li key={country.name}>
            <img src={country.flag} alt={country.name} width="20px"/>
            <button className="list-button" onClick={() => setShowOne(country)}> {country.name}</button>
          </li>
        )}
        </ul>
      </div>
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