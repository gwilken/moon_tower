import React from 'react'
import Dashboard from './Dashboard'
import Solar from './Solar'
import House from './House'
import GPS from './GPS'
// import Fridge from './Fridge'

require('../js/ui/resizeListener')
require('./Websocket')

const App = () => {
  return (
    <div>
      <Dashboard>
        <Solar />
        <House />
        <GPS />
        {/* <Fridge /> */}
      </Dashboard>
    </div>
  );
}

export default App