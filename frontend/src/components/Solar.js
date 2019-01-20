import React, { Component } from 'react'
import Panel from './Panel'
import { connect } from 'react-redux'
import { addInitialData } from '../js/actions.js'
import store from '../js/store'
import axios from 'axios'

const mapStateToProps = state => {
    return { data: state.power }
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
        axios.get(`/key/power/`)
            .then(res => this.receivedInitialData(res.data))
    }

    receivedInitialData = (data) => {
        store.dispatch( addInitialData(data, 'power') )
    }
    
    render () {
      return (
        <Panel 
            title="Solar"
            value={ this.state.currentValue }
            unit={ this.state.unit }
            color="yellow"
            scores={ this.props.data.map(elem => elem.current) } 
            timestamps= { this.props.data.map(elem => elem.timestamp) } />
      )
  }
}

const Solar = connect(mapStateToProps)(ReduxSolar)

export default Solar