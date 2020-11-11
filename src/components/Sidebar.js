import React from 'react'
import AdvancedSearch from './AdvancedSearch'

export default function Sidebar({ region, regionChange, regionArray, subregion, subregionChange, subregionArray, population, setPopulation, reverseOrder, setReverseOrder, showSidebar, clearRegion, clearSubregion, area, setArea }) {

  function handleArea() {
    setArea(true)
    setPopulation(false)
  }

  function handlePopulation() {
    setPopulation(true)
    setArea(false)
  }

  function handleAlpha() {
    setArea(false)
    setPopulation(false)
  }

  return (
    <div className={`sidebar${showSidebar ? ' open' : ''}`}>
      <AdvancedSearch 
        region={region}
        regionChange={regionChange}
        regionArray={regionArray}
        subregion={subregion}
        subregionChange={subregionChange}
        subregionArray={subregionArray}
        clearRegion={clearRegion}
        clearSubregion={clearSubregion}
      />
      <div>
        
        {/* <button onClick={() => setPopulation(!population)}>
          sort by {population ? "alphabetical" : "population"}
        </button> */}
        <button onClick={handlePopulation}>
          sort by population
        </button>
        <button onClick={handleArea}>
          sort by area
        </button>
        <button onClick={handleAlpha}>
          sort by name
        </button>
    

        <button onClick={() => setReverseOrder(!reverseOrder)}>
          reverse order
        </button>
      </div>
      <div className="sidebar-credits">
        made by mitchell bartolo
        send any comments, questions or suggestiong to
      </div>
    </div>
  )
}