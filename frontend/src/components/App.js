import React from 'react'
import Dashboard from './Dashboard'
import Solar from './Solar'
import House from './House'
// import Fridge from './Fridge'

require  ('../js/websocket')
require('../js/ui/resizeListener')

const App = () => {
  return (
    <div>
      <Dashboard>
        <Solar />
        <House />
        {/* <Fridge /> */}
      </Dashboard>
    </div>
  );
}

export default App