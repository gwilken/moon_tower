import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import Header from './Header'

const Map = ReactMapboxGl({
accessToken: "pk.eyJ1IjoiZ3dpbGtlbiIsImEiOiJjanI1ajR6Z2QwMWk1NDRubXYyYmV6OHVkIn0.D68kEgoBzr8IZn8zz40MOQ"
});

class GPS extends Component {
  constructor(props) {
      super()

      this.state = {
      }
  }

  returnLastDataList = () => {
    let listArr = []

    for ( let [label, data] of Object.entries( this.props.data[this.props.data.length - 1]) ) {
      listArr.push(
        <div className="gps-info-row" label={label} >
          <div className="gps-info-data">{ data }</div>
          <div className="gps-info-label">{ label }</div>
        </div>
      )
    }

    listArr.sort( (a,b) => {
      if(a.props.label < b.props.label) { return -1; }
      if(a.props.label > b.props.label) { return 1; }
      return 0;
    })

    return listArr
  }

  returnCurrentView = () => {
    switch (this.props.currentView) {
      case 0:
        return (
          <div className="panel">
              <Header title="GPS" color="cyan" onClick={ this.props.onClick }/>
              <Map
                  // eslint-disable-next-line 
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
    
      case 1:
        return (
          <div className="panel">
            <Header title="GPS" color="cyan" onClick={ this.props.onClick }/>

            <div className="gps-info-container">
              { this.returnLastDataList() }
            </div>
          </div>   
      )

      default:
          break;

    }
  }

  render () {
    let currentView = this.returnCurrentView()

      return (
        <div>
          { currentView }
        </div>
      )
  }
}

export default GPS