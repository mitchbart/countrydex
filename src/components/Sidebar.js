import React from 'react'
import AdvancedSearch from './AdvancedSearch'

export default function Sidebar({ region, regionChange, regionArray, subregion, subregionChange, subregionArray, population, setPopulation, reverseOrder, setReverseOrder, showSidebar }) {
  return (
    <div className={`sidebar${showSidebar ? ' open' : ''}`}>
      <AdvancedSearch 
        region={region}
        regionChange={regionChange}
        regionArray={regionArray}
        subregion={subregion}
        subregionChange={subregionChange}
        subregionArray={subregionArray}
      />
      <div>
        <button onClick={() => setPopulation(!population)}>
          sort by {population ? "alphabetical" : "population"}
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