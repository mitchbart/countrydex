import React from 'react'

export default function Search({ filter, setFilter, handleReset }) {

  const handleFilter = e => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <input value={filter} onChange={handleFilter} placeholder="Search for a country" />
      <button onClick={handleReset}>
        clear all
      </button>
    </div>
  )
  
}