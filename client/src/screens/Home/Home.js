import React from 'react'

import CitySelect from 'screens/Home/ui/CitySelect'
import FilterSelect from 'screens/Home/ui/FilterSelect'
import LocationSelect from 'screens/Home/ui/PlaceSelect'

function Home () {
  return (
    <section className="section">
      <div className="container">
        <CitySelect />
        <FilterSelect />
        <LocationSelect />
      </div>
    </section>
  )
}

export default Home
