import React from 'react'

export default function Search({ filter, setFilter, handleReset }) {

  const handleFilter = e => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <input value={filter} onChange={handleFilter} />
      <button onClick={handleReset}>
        clear all
      </button>
    </div>
  )
  
}