import React, { Component } from 'react'
import Solar from './Solar'
import { connect } from 'react-redux'
import { addInitialData } from '../js/actions.js'
import store from '../js/store'
import axios from 'axios'
import moment from 'moment'

const mapStateToProps = state => {
  return { data: state.solar }
}


class ReduxSolarContainer extends Component {
constructor(props) {
    super()

    this.state = {
        currentView: 0,
        window: 30,
        color: 'yellow',
        mostRecentData: null
    }
}

componentWillMount() {
    axios.get(`/api/window/solar-set/30`)
        .then(res => this.receivedInitialData(res.data))
}

receivedInitialData = (data) => {
    
    data.forEach(elem => {
      console.log(moment(elem.timestamp * 1000).format())
    })

    store.dispatch( addInitialData(data, 'solar') )
}

handleClick = () => {
  let view = this.state.currentView + 1

  this.setState({
    currentView: view < 4 ? view : 0
  })
}

render () {
    return ( 
      <Solar
        data={ this.props.data} 
        currentView={ this.state.currentView } 
        window={ this.state.window }
        mostRecentData={ this.state.mostRecentData } 
        color={ this.state.color }
        onClick={ this.handleClick }
      />
    )
  }
}

const SolarContainer = connect(mapStateToProps)(ReduxSolarContainer)

export default SolarContainer