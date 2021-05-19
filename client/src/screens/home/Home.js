import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCities } from './homeSlice'
import CitySelect from '../../components/CitySelect'

function Home () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCities())
  })

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="block">
            <h3 className="title is-4">Find places in</h3>
            <CitySelect />
          </div>

          <h3 className="title is-4">Filters</h3>
        </div>
      </section>
    </>
  )
}

export default Home
