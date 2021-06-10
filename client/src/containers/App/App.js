import React from 'react'
import { useSelector } from 'react-redux'

import { getAppData } from 'containers/App/data/appSelectors'

import 'assets/styles/App.scss'

import Home from 'containers/Home/Home'
import Place from 'containers/Place/Place'

function App() {
  const appData = useSelector(getAppData)

  return (
    <div className="App">
      { appData.currentScreen === 'Home' 
        ? <Home />
        : <Place />
      }
    </div>
  )
}

export default App
