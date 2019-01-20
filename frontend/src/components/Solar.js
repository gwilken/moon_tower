import React, { Component } from 'react'
import Panel from './Panel'
import { connect } from 'react-redux'
import { addInitialData } from '../js/actions.js'
import store from '../js/store'
import axios from 'axios'

const mapStateToProps = state => {
    return { data: state.solar }
}

class ReduxSolar extends Component {
    constructor(props) {
        super()

        this.state = {
            currentValue: 2280,
            unit: 'mA'
        }
    }

    componentWillMount() {
        axios.get(`/api/key/solar-set/`)
            .then(res => this.receivedInitialData(res.data))
    }

    receivedInitialData = (data) => {
        console.log('solar data:', data)
        store.dispatch( addInitialData(data, 'solar') )
    }
    
    render () {
      return (
        <Panel 
            title="Solar"
            value={ this.state.currentValue }
            unit={ this.state.unit }
            color="yellow"
            scores={ this.props.data.map(elem => parseInt(elem.current).toFixed(0 )) } 
            timestamps= { this.props.data.map(elem => parseInt(elem.timestamp).toFixed(0) ) } />
      )
  }
}

const Solar = connect(mapStateToProps)(ReduxSolar)

export default Solar