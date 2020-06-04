import React from 'react'
import Search from './Search'

export default function Topbar({ filter, setFilter, handleReset, setListView }) {
  return (
    <div className="topbar">
      <Search
        filter={filter}
        setFilter={setFilter}
        handleReset={handleReset}
      />

      <h1 className="topbar-title">Countrydex</h1>

      <span>
        <button onClick={() => setListView(true)}>list</button>
        <button onClick={() => setListView(false)}>card</button>
      </span>
    </div>


  )
}