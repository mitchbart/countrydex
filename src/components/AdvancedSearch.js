import React from 'react'

export default function AdvancedSearch({ region, regionChange, regionArray, subregion, subregionChange, subregionArray, clearRegion, clearSubregion }) {



  return (
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

        <button onClick={clearRegion}>
          clear region
        </button>

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

            <button onClick={clearSubregion}>
              clear subregion
            </button>
          </div>
        }

        {/* <fieldset>
          <legend>select subregion</legend>
            {subregionArray.map(subregion => 
              <div key={subregion}>
                <input onChange={handleSubregion} type="checkbox" id={subregion} name={subregion}/>
                <label htmlFor={subregion}>{subregion}</label>
              </div>
            )}
        </fieldset> */}


    </div>

  )
}