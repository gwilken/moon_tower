import React, { Component } from 'react'
import Dashboard from './Dashboard'
import Solar from './Solar'
import Energy from './Energy'
import Fridge from './Fridge'

require  ('../js/websocket')
require('../js/ui/resizeListener')

const App = () => {
  return (
    <div>
      <Dashboard>
        <Solar />
        <Energy />
        <Fridge />
÷      </Dashboard>
    </div>
  );
}

export default App