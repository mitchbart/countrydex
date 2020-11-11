import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import ContentMain from './components/ContentMain'

function App() {
  const [countryData, setCountryData] = useState([])
  const [filter, setFilter] = useState("")
  const [showOne, setShowOne] = useState("")
  const [region, setRegion] = useState("")
  const [subregion, setSubregion] = useState("")
  const [population, setPopulation] = useState(false)
  const [area, setArea] = useState(false)
  const [reverseOrder, setReverseOrder] = useState(false)
  const [listView, setListView] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

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
  // function sortBy() {
  //   if (reverseOrder) {
  //     return (population 
  //       ? (function (a, b) { return a.population - b.population}) 
  //       : (function (a, b) { 
  //         return b.name > a.name})
  //     )
  //   }
  //   return (population 
  //     ? (function (a, b) { return b.population - a.population}) 
  //     : (function (a, b) { 
  //       return a.name > b.name})
  //   )
  // }

  function sortBy() {
    if (reverseOrder) {
      return (
        population ? (function (a, b) { return a.population - b.population }) 
        : area ? (function (a, b) { return a.area - b.area })
        : (function (a, b) { 
          return b.name > a.name})
      )
    }
    return (population 
      ? (function (a, b) { return b.population - a.population})
      : area ? (function (a, b) { return b.area - a.area }) 
      : (function (a, b) { 
        return a.name > b.name})
    )
  }

  //filter for which countries to show
  const countriesToShow = !filter && !region
    ? countryData
      .sort(sortBy())
    : countryData
      .filter(country => country.region.includes(region))
      //.filter(country => subregion.includes(country.subregion))
      .filter(country => country.subregion.includes(subregion))
      .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
      .sort(sortBy())





  //complete reset of search
  function handleReset() {
    setShowOne("")
    setFilter("")
    setRegion("")
    setSubregion("")
  }

  const regionChange = (event) => {
    //console.log(event.target.value)
    setRegion(event.target.value)
    setSubregion("")
  }

  function clearRegion() {
    setRegion("")
  }

  function clearSubregion() {
    setSubregion("")
  }

  const subregionChange = (event) => {
    setSubregion(event.target.value)
  }

  //checkbox functionality for subregion that has been removed
  // function handleSubregion(event) {
  //   if (event.target.checked) {
  //     setSubregion(subregion.concat(event.target.name))
  //   }
  //   else {
  //     setSubregion(subregion.filter(name => name !== event.target.name))
  //   }
  // }

  const regionArray = [...new Set(countryData
    .filter(country => country.region !== "")
    .map(country => country.region)
    )]
    .sort()
  //console.log(regionArray)

  //at present this array relies on the value for the selected region, may change in the future
  const subregionArray = [...new Set(countryData
    .filter(country => country.region === region)
    .map(country => country.subregion)
    )]
    .sort()
  //console.log(subregionArray)


  //test array for currency, not using becuase ...
  // const currencyArray = [...new Set(countriesToShow
  //   .filter(country => country.languages[0].name !== "")
  //   .map(country => country.languages
  //     .map(currency => currency.name))
  //     .reduce((flat, current) => flat.concat(current), [])
  //     //.flat()
  //     )]
  //   .sort() 
  // console.log(currencyArray)

  // const currencyChange = (event) => {
  //   setCurrency(event.target.value)
  // }



  return (
    <div className="cosmic-microwave-background">
      

      {/* <Search
        filter={filter}
        setFilter={setFilter}
        handleReset={handleReset}
      /> */}

      <Topbar
        filter={filter}
        setFilter={setFilter}
        handleReset={handleReset} 
        setListView={setListView}
      />

        
        <button className="burger-button" onClick={()=> setShowSidebar(!showSidebar)}>
          menu
        </button>

      <Sidebar
        region={region}
        regionChange={regionChange}
        regionArray={regionArray}
        subregion={subregion}
        subregionChange={subregionChange}
        subregionArray={subregionArray}
        population={population}
        setPopulation={setPopulation}
        area = {area}
        setArea={setArea}
        reverseOrder={reverseOrder}
        setReverseOrder={setReverseOrder}
        showSidebar={showSidebar}
        clearRegion={clearRegion}
        clearSubregion={clearSubregion}
      />

      

      
      {/* <AdvancedSearch 
        region={region}
        regionChange={regionChange}
        regionArray={regionArray}
        subregion={subregion}
        subregionChange={subregionChange}
        subregionArray={subregionArray}
      /> */}

      {/* <button onClick={() => setPopulation(!population)}>
        sort by {population ? "alphabetical" : "population"}
      </button>
      <button onClick={() => setReverseOrder(!reverseOrder)}>
        reverse order
      </button> */}

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
      <div className="content-wrapper"> 
        <ContentMain 
          countryData={countryData}
          countriesToShow={countriesToShow}
          showOne={showOne}
          setShowOne={setShowOne}
          listView={listView}
        />
      </div>
      
      
    </div>
  )
}

export default App
