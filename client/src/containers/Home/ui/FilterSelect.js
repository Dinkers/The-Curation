import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { requestGetFilters, setSelectedFilter } from 'containers/Home/data/homeSlice'
import { getFiltersData, getCitiesData } from 'containers/Home/data/homeSelectors'

import Tag from 'components/Tag/Tag'
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
              <div className="tags">
                <Tag
                  clickHandler={ () => handleFilterSelection(filter.id) }
                  isSelected={ isSelected }
                  text={ filter.usp || filter.vital_info }
                />
              </div>
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
