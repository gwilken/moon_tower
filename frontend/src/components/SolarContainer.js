import React, { Component } from 'react'
import Solar from './Solar'
import { connect } from 'react-redux'
import { addInitialData } from '../js/actions.js'
import store from '../js/store'
import { getHashsFromSetByScore, getHashsFromSet } from '../js/api'

const mapStateToProps = state => {
  return { 
    solarData: state.solar,
    houseData: state.house 
  }
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
  getHashsFromSet('solar-set', -30, -1)
  .then(data => {
    console.log('DATA:', data)
   // this.receivedInitialData(data)
  })
}

receivedInitialData = (data) => {
    store.dispatch( addInitialData(data, 'solar') )
}

handleChangeWindow = (val) => {
  this.setState({
    window: val
  })
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
        data={ this.props.solarData }
        houseData={ this.props.houseData } 
        currentView={ this.state.currentView } 
        window={ this.state.window }
        mostRecentData={ this.state.mostRecentData } 
        color={ this.state.color }
        onClick={ this.handleClick } />
    )
  }
}

const SolarContainer = connect(mapStateToProps)(ReduxSolarContainer)

export default SolarContainer