import React from 'react'

import CitySelect from 'containers/Home/ui/CitySelect'
import PlaceTypeSelect from './ui/PlaceTypeSelect'
import FilterSelect from 'containers/Home/ui/FilterSelect'
import PlaceSelect from 'containers/Home/ui/PlaceSelect'

function Home () {
  return (
    <section className="section">
      <div className="container">
        <CitySelect />
        <PlaceTypeSelect />
        <FilterSelect />
        <PlaceSelect />
      </div>
    </section>
  )
}

export default Home
