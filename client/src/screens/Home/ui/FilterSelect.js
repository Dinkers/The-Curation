import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { requestGetFilters, setSelectedFilter } from 'screens/Home/data/homeSlice'
import { getFiltersData, getCitiesData } from 'screens/Home/data/homeSelectors'

import Card from 'components/Card/Card'
import Notification from 'components/Notification/Notification'

function FilterSelect () {
  const dispatch = useDispatch()

  const filtersData = useSelector(getFiltersData);
  const citiesData = useSelector(getCitiesData)

  useEffect(() => {
    if (
      citiesData.citiesRequest === 'completed' 
      && filtersData.filtersRequest === 'initial'
    ) {
      dispatch(requestGetFilters(citiesData.selectedCity.id))
    }
  })

  const handleFilterSelection = (filterName) =>{
    dispatch(setSelectedFilter(filterName))
  }

  const generateFilterSelector = () => {
    const filterSelector = []
    const aggregatedFilters = 
      filtersData.filters.usps.concat(
        filtersData.filters.vital_infos
      )

    if (aggregatedFilters.length) {

      filterSelector.push(

        aggregatedFilters.map((filter => {

          let isSelected = filtersData.selectedFilters.includes(filter.id)

          return (
            <div className="column" key={`filter-select-block-${filter.id}`}>
              <Card
                cardType='image'
                imageRatio='is-128x128'
                image={ filtersData.filtersImages[filter.usp || filter.vital_info] }
                title={ filter.usp || filter.vital_info }
                isSelected={ isSelected }
                clickHandler={() => handleFilterSelection(filter.id)}
              />
            </div>
          )
        }))
      )
    }

    return filterSelector
  }

  return (
    <>
      { filtersData.filtersRequest === 'completed' 
        && (filtersData.filters.usps || filtersData.filters.vital_infos)
        ? (
          <div className="block">
            <h3 className="title is-4">Filters</h3>
            <div className="columns is-mobile is-scroll-overflow">
              {  generateFilterSelector() }
            </div>
          </div>
        ) : (
          <Notification 
            message={
              filtersData.filtersRequest === 'completed'
              ? 'No filters found'
              : 'Loading filters...'
            }
          />
        )
      }
    </>
  )
}

export default FilterSelect
