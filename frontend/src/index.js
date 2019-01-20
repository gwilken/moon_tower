import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './js/store'
import App from './components/App'

import './css/index.css'

ReactDOM.render (
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
)

console.log(`

███╗   ███╗ ██████╗  ██████╗ ███╗   ██╗     
████╗ ████║██╔═══██╗██╔═══██╗████╗  ██║     
██╔████╔██║██║   ██║██║   ██║██╔██╗ ██║     
██║╚██╔╝██║██║   ██║██║   ██║██║╚██╗██║     
██║ ╚═╝ ██║╚██████╔╝╚██████╔╝██║ ╚████║     
╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝     
                                            
████████╗ ██████╗ ██╗    ██╗███████╗██████╗ 
╚══██╔══╝██╔═══██╗██║    ██║██╔════╝██╔══██╗
   ██║   ██║   ██║██║ █╗ ██║█████╗  ██████╔╝
   ██║   ██║   ██║██║███╗██║██╔══╝  ██╔══██╗
   ██║   ╚██████╔╝╚███╔███╔╝███████╗██║  ██║
   ╚═╝    ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝
fiesta at the Moon Tower v.0.0.1
`)