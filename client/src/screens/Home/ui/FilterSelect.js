import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { requestGetFilters, setSelectedFilter } from 'screens/Home/data/homeSlice'

import Card from 'components/Card/Card'
import Notification from 'components/Notification/Notification'

function FilterSelect () {
  const dispatch = useDispatch()

  const citiesRequest = useSelector((state) => state.home.citiesRequest)
  const selectedCity = useSelector((state) => state.home.selectedCity)

  const filters = useSelector((state) => state.home.filters)
  const filtersRequest = useSelector((state) => state.home.filtersRequest)
  const selectedFilters = useSelector((state) => state.home.selectedFilters)

  const testImage = 'https://source.unsplash.com/YFSrp4JhDyI/900x900'

  useEffect(() => {
    if (citiesRequest === 'completed' && filtersRequest === 'initial') {
      dispatch(requestGetFilters(selectedCity.id))
    }
  })

  function handleFilterSelection(filterName) {
    dispatch(setSelectedFilter(filterName))
  }

  const generateFilterSelector = () => {
    const filterSelector = []

    filterSelector.push(
      filters.usps.map((usp => {

        let isSelected = selectedFilters.includes(usp.id)

        return (
          <div className="column" key={`filter-select-block-${usp.id}`}>
            <Card
              cardType='image'
              imageRatio='is-128x128'
              image={ testImage }
              title={ usp.usp }
              isSelected={ isSelected }
              clickHandler={() => handleFilterSelection(usp.id)}
            />
          </div>
        )
      }))
    )

    return filterSelector
  }

  return (
    <>
      { filtersRequest === 'completed' 
        ? (
          <div className="block">
            <h3 className="title is-4">Filters</h3>
            <div className="columns is-mobile is-scroll-overflow">
              {  generateFilterSelector() }
            </div>
          </div>
        ) : (
          <Notification 
            message="Loading filters..."
          />
        )
      }
    </>
  )
}

export default FilterSelect
