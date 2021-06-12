import React from 'react'

import CitySelect from 'containers/Home/ui/CitySelect'
import FilterSelect from 'containers/Home/ui/FilterSelect'
import LocationSelect from 'containers/Home/ui/PlaceSelect'

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
