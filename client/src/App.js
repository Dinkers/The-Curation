import React, { useState } from 'react'

import 'assets/styles/App.scss'

import Home from 'screens/Home/Home'

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
