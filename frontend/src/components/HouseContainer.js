import React, { Component } from 'react'
import House from './House'
import { connect } from 'react-redux'
import { addInitialData } from '../js/actions.js'
import store from '../js/store'
import axios from 'axios'


const mapStateToProps = state => {
  return { data: state.house }
}


class ReduxHouseContainer extends Component {
constructor(props) {
    super()

    this.state = {
        currentView: 0,
        color: 'magenta',
        mostRecentData: null
    }
}

componentWillMount() {
    axios.get(`/api/key/house-set/`)
        .then(res => this.receivedInitialData(res.data))
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

render () {
    return ( 
      <House
        data={ this.props.data} 
        currentView={ this.state.currentView } 
        mostRecentData={ this.state.mostRecentData } 
        color={ this.state.color }
        onClick={ this.handleClick }
      />
    )
  }
}

const HouseContainer = connect(mapStateToProps)(ReduxHouseContainer)

export default HouseContainer