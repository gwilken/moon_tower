import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import Panel from './Panel'
import Header from './Header'

import { connect } from 'react-redux'
import { addInitialData } from '../js/actions.js'
import store from '../js/store'
import axios from 'axios'

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiZ3dpbGtlbiIsImEiOiJjanI1ajR6Z2QwMWk1NDRubXYyYmV6OHVkIn0.D68kEgoBzr8IZn8zz40MOQ"
  });

const mapStateToProps = state => {
    return { 
        data: state.gps,
        lastGps: state.gps[state.gps.length - 1]
    }
}

class ReduxGPS extends Component {
    constructor(props) {
        super()

        this.state = {
            lastLonLat: null
        }
    }

    componentWillMount() {
        axios.get(`/api/key/gps-set/`)
            .then(res => this.receivedInitialData(res.data))
    }

    receivedInitialData = (data) => {
        console.log('gps data:', data)
        store.dispatch( addInitialData(data, 'gps') )
    }
    
    render () {         
        return (
            <div className="panel">
                <Header title="GPS" color="cyan" />
                <Map
                    style="mapbox://styles/gwilken/cjr5ki34136js2rt88hwjq6km"
                    zoom={ [14] }
                    center= { this.props.lastGps ? [parseFloat(this.props.lastGps.longitude), parseFloat(this.props.lastGps.latitude)] : [-118.2602235, 34.101106833] }
                    containerStyle={{
                height: "90%",
                width: "100%"
                }}>
                    <Layer
                        type="symbol"
                        id="marker"
                        layout={{ "icon-image": "marker-15" }}>
                        <Feature coordinates={ [this.props.data.longitude, this.props.data.latitude] }/>
                    </Layer>
                </Map>
            </div>
        )
    }
}

const GPS = connect(mapStateToProps)(ReduxGPS)

export default GPS