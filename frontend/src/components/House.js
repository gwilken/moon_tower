import React, { Component } from 'react'
import Panel from './Panel'
import { connect } from 'react-redux'
import { addInitialData } from '../js/actions.js'
import store from '../js/store'
import axios from 'axios'

const mapStateToProps = state => {
    return { data: state.house }
}

class ReduxHouse extends Component {
    constructor(props) {
        super()

        this.state = {
            currentValue: 1280,
            unit: 'mA'
        }
    }

    componentWillMount() {
        axios.get(`/api/key/house-set/`)
            .then(res => this.receivedInitialData(res.data))
    }

    receivedInitialData = (data) => {
        console.log('house data:', data)
        store.dispatch( addInitialData(data, 'house') )
    }
    
    render () {
      return (
        <Panel 
            title="Power"
            value={ this.state.currentValue }
            unit={ this.state.unit }
            color="magenta"
            scores={ this.props.data.map(elem => parseInt(elem.current).toFixed(0) ) } 
            timestamps= { this.props.data.map(elem => parseInt(elem.timestamp).toFixed(0) ) } />
      )
  }
}

const House = connect(mapStateToProps)(ReduxHouse)

export default House