import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSelectedFilter } from '../screens/home/homeSlice'

import Card from '../components/Card'

function FilterSelect () {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.home.filters)
  const selectedFilters = useSelector((state) => state.home.selectedFilters)
  const testImage = 'https://source.unsplash.com/YFSrp4JhDyI/900x900'

  function handleFilterSelection(filterName) {
    dispatch(setSelectedFilter(filterName))
  }

  const filterSelector = filters.map((filter, index) => {
    
    let isSelected = selectedFilters.includes(filter)

    return (
      <div className="column" key={`filter-select-block-${index}`}>
        <Card
          cardType='image'
          imageRatio='is-128x128'
          image={ testImage }
          title={ filter }
          isSelected={ isSelected }
          clickHandler={() => handleFilterSelection(filter)}
        />
      </div>
    )
  }
  )

  return (
    <>
      <div className="columns is-mobile is-scroll-overflow">
        { filterSelector }
      </div>
    </>
  )
}

export default FilterSelect
