import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { requestGetFilters, setSelectedFilter } from 'screens/Home/data/homeSlice'

import Card from 'components/Card/Card'
import Notification from 'components/Notification/Notification'

const filterImageMap = {
  'Two Michelin stars': 'https://source.unsplash.com/Z6E62SLyqj8',
  'Peaceful location': 'https://source.unsplash.com/Uq3gTiPlqRo',
  'Locally brewed beer': 'https://source.unsplash.com/EHbtjmz7hvw',
  'View of London': 'https://source.unsplash.com/DpI-_wydgJM',
  'Red seats': 'https://source.unsplash.com/8aYbhJOhtJw',
  'Specialty coffee': 'https://source.unsplash.com/lcfH0p6emhw',
  'Vegan friendly': 'https://source.unsplash.com/2IxTgsgFi-s',
  'Accessible': 'https://source.unsplash.com/ju1yFZkrxVg',
  'Helal beer': 'https://source.unsplash.com/C8eSYwQkwHw'
}

function FilterSelect () {
  const dispatch = useDispatch()

  const citiesRequest = useSelector((state) => state.home.citiesRequest)
  const selectedCity = useSelector((state) => state.home.selectedCity)

  const filters = useSelector((state) => state.home.filters)
  const filtersRequest = useSelector((state) => state.home.filtersRequest)
  const selectedFilters = useSelector((state) => state.home.selectedFilters)

  useEffect(() => {
    if (citiesRequest === 'completed' && filtersRequest === 'initial') {
      dispatch(requestGetFilters(selectedCity.id))
    }
  })

  const handleFilterSelection = (filterName) =>{
    dispatch(setSelectedFilter(filterName))
  }

  const generateFilterSelector = () => {
    const filterSelector = []
    const aggregatedFilters = filters.usps.concat(filters.vital_infos)

    if (aggregatedFilters.length) {

      filterSelector.push(

        aggregatedFilters.map((filter => {

          let isSelected = selectedFilters.includes(filter.id)

          return (
            <div className="column" key={`filter-select-block-${filter.id}`}>
              <Card
                cardType='image'
                imageRatio='is-128x128'
                image={ filterImageMap[filter.usp || filter.vital_info] }
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
      { filtersRequest === 'completed' && (filters.usps || filters.vital_infos)
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
              filtersRequest === 'completed'
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
