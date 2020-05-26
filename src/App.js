import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search'
import ContentMain from './components/ContentMain'

function App() {
  const [countryData, setCountryData] = useState([])
  const [filter, setFilter] = useState("")
  const [showOne, setShowOne] = useState("")
  const [region, setRegion] = useState("")
  const [subregion, setSubregion] = useState("")
  const [population, setPopulation] = useState(false)

  //get countries from api only on initial load, store in countrydata
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountryData(response.data)
    })
  }, [])


  //function to control sorting by population or alphabetical within countriestoshow
  function sortBy() {
    return (population 
      ? (function (a, b) { return b.population - a.population}) 
      : (function (a, b) { 
        return a.name > b.name})
    )
  }

  const countriesToShow = !filter && !region
    ? countryData
      .sort(sortBy())
    : countryData
      .filter(country => country.region === region)
      .filter(country => country.subregion.includes(subregion))
      .filter(country => country.name.toLowerCase()
        .includes(filter.toLowerCase()))
      .sort(sortBy())

  //complete reset of search
  function handleReset() {
    console.log("handlereset")
    setShowOne("")
    setFilter("")
  }

  const regionChange = (event) => {
    //console.log(event.target.value)
    setRegion(event.target.value)
    setSubregion("")
    //console.log(region)
  }

  const subregionChange = (event) => {
    setSubregion(event.target.value)
  }

  const regionArray = [...new Set(countryData
    .filter(country => country.region !== "")
    .map(country => country.region))]
    .sort()
  //console.log(regionArray)

  const subregionArray = [...new Set(countryData
    .filter(country => country.region === region)
    .map(country => country.subregion))]
    .sort()
  console.log(subregionArray)


  return (
    <div className="cosmic-microwave-background">
      <h1>Countrydex</h1>

      <Search
        filter={filter}
        setFilter={setFilter}
        handleReset={handleReset}
      />

      <div>
        Region
        <select 
          value={region}
          onChange={regionChange}
        >
          <option value="">All</option>
          {regionArray.map(region => 
            <option 
              key={region} 
              value={region}
            >
            {region}
            </option>
        )}
        </select>

        {region && 
          <div>select subregion
            <select 
              value={subregion}
              onChange={subregionChange}
            >
              <option value="">All</option>
              {subregionArray.map(subregion => 
                <option 
                  key={subregion} 
                  value={subregion}
                >
                {subregion}
                </option>
              )}
            </select>
          </div>
        }

      </div>

      <button onClick={() => setPopulation(!population)}>
        sort by {population ? "alphabetical" : "population"}
      </button>

{/* 
      <fieldset>
        <legend>select a region</legend>
        {regionArray.map(region => 
        <div key={region}>
          <input type="checkbox" id={region} name={region}/>
          <label htmlFor={region}>{region}</label>
        </div>
        )}
      </fieldset> */}

      <ContentMain 
        countriesToShow={countriesToShow}
        showOne={showOne}
        setShowOne={setShowOne}
      />
      
    </div>
  )
}

export default App
