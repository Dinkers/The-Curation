import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getCities } from './homeSlice'
import CitySelect from '../../components/CitySelect'
import FilterSelect from '../../components/FilterSelect'

function Home () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCities())
  })

  return (
    <section className="section">
      <div className="container">
        <div className="block">
          <h3 className="title is-4">Find places in</h3>
          <CitySelect />
        </div>

        <div className="block">
          <h3 className="title is-4">Filters</h3>
          <FilterSelect />
        </div>
      </div>
    </section>
  )
}

export default Home
