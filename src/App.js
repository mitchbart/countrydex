import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search'
import ContentMain from './components/ContentMain'
import AdvancedSearch from './components/AdvancedSearch'

function App() {
  const [countryData, setCountryData] = useState([])
  const [filter, setFilter] = useState("")
  const [showOne, setShowOne] = useState("")
  const [region, setRegion] = useState("")
  const [subregion, setSubregion] = useState([])
  const [population, setPopulation] = useState(false)

  //get countries from api only on initial load, store in countrydata
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountryData(response.data)
    })
  }, [])
  console.log('render', countryData.length, 'countries')
  //console.log(countryData)


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
      .filter(country => country.region.includes(region))
      //.filter(country => subregion.includes(country.subregion))
      .filter(country => subregion.includes(country.subregion))
      // .filter(country => country.subregion.includes(subregion))
      //.filter(country => country.subregion.indexOf(subregion) >= -1)
      //.filter(country => country.subregion.includes(subregion.some(x => x === country.subregion)))
      .filter(country => country.name.toLowerCase()
        .includes(filter.toLowerCase()))
      .sort(sortBy())


  //const arr1 = countryData.filter(country => country.subregion.includes(subregion))
  // const arr1 = countryData.filter(country => subregion.includes(country.subregion))

  // console.log(arr1)
  // const found = subregion.some(r => arr1.includes(r))
  // console.log(found)


  //complete reset of search
  function handleReset() {
    //console.log("handlereset")
    setShowOne("")
    setFilter("")
    setRegion("")
    setSubregion("")
  }

  const regionChange = (event) => {
    //console.log(event.target.value)
    setRegion(event.target.value)
    setSubregion([])
    //console.log(region)
  }

  const subregionChange = (event) => {
    setSubregion(event.target.value)
  }

  //testing checkboxes for subregion
  function handleSubregion(event) {
    //console.log(event.target.name)
    if (event.target.checked) {
      //console.log(event.target.name, 'checked')
      setSubregion(subregion.concat(event.target.name))
      //console.log(subregion)
    }
    else {
      setSubregion(subregion.filter(name => name !== event.target.name))
      //console.log('havent added this funtionality')
    }
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
  //console.log(subregionArray)


  return (
    <div className="cosmic-microwave-background">
      <h1>Countrydex</h1>

      <Search
        filter={filter}
        setFilter={setFilter}
        handleReset={handleReset}
      />

      <AdvancedSearch 
        region={region}
        regionChange={regionChange}
        regionArray={regionArray}
        subregion={subregion}
        subregionChange={subregionChange}
        subregionArray={subregionArray}

        handleSubregion={handleSubregion}
      />

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
