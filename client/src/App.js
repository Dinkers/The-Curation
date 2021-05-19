import React, { useState, useEffect } from 'react'
import Home from './screens/home/Home'
import './assets/styles/App.scss'

// A dictionary of available screens in the app
const screens = {
  home: 'Home',
  place: 'Place'
}

const initialState = {
  screen: screens.home
}

function App() {
  const [currentScreen, setCurrentScreen] = useState(initialState.screen)

  const renderScreen = (screen) => {
    if (screen === screens.home) {
      return <Home />
    }
  }

  return (
    <div className="App">
      { renderScreen(currentScreen) }
    </div>
  )
}

export default App
