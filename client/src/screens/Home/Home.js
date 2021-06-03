import React from 'react'

import CitySelect from 'screens/Home/ui/CitySelect'
import FilterSelect from 'screens/Home/ui/FilterSelect'
import LocationSelect from 'screens/Home/ui/PlaceSelect'

function Home () {
  return (
    <section className="section">
      <div className="container">
        <CitySelect />

        <div className="block">
          <h3 className="title is-4">Filters</h3>
          <FilterSelect />
        </div>

        <LocationSelect />
      </div>
    </section>
  )
}

export default Home
