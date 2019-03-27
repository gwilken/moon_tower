import React, { Component } from 'react'
import House from './House'
import { connect } from 'react-redux'
import { addInitialData } from '../js/actions.js'
import store from '../js/store'
import { getHashsFromSetByScore, getHashsFromSet } from '../js/api'


const mapStateToProps = state => {
  return { data: state.house }
}


class ReduxHouseContainer extends Component {
  constructor(props) {
    super()

    this.state = {
      currentView: 0,
      window: 30,
      color: 'cyan',
      mostRecentData: null
    }
  }

componentWillMount() {
  // getHashsFromSetByScore('gps-set', 1552260143, 1552260193)
  getHashsFromSet('house-set', -30, -1)
  .then(data => {
    console.log('DATA:', data)
    this.receivedInitialData(data)
  })
}

receivedInitialData = (data) => {
    store.dispatch( addInitialData(data, 'house') )
}

handleClick = () => {
  let view = this.state.currentView + 1

  this.setState({
    currentView: view < 4 ? view : 0
  })
}

handleChangeWindow = (val) => {
  this.setState({
    window: val
  })
}

render () {
  return ( 
    <House
      data={ this.props.data} 
      currentView={ this.state.currentView } 
      mostRecentData={ this.state.mostRecentData } 
      color={ this.state.color }
      window={ this.state.window }
      onClick={ this.handleClick } />
    )
  }
}

const HouseContainer = connect(mapStateToProps)(ReduxHouseContainer)

export default HouseContainer