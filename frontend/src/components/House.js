import React, { Component } from 'react'
import Header from './Header'
import Bar from './BarChart'


class House extends Component {
  constructor(props) {
      super()

      this.state = {
        value: 240,
        unit: 'mA'
      }
  }
  
  returnCurrentView = () => {
    switch (this.props.currentView) {
      case 0:
        return (
          <div className="panel">
              <Header
                title="House" 
                color={ this.props.color } 
                value={ this.state.value } 
                unit="mA" 
                onClick={ this.props.onClick }
                />
                
                <Bar 
                  scores={ this.props.data.map(elem => parseInt(elem.current).toFixed(0 )) } 
                  timestamps={  this.props.data.map(elem => parseInt(elem.timestamp) ) } 
                  color={ this.props.color } />
          </div>
        )
      
        case 1:
          return (
            <div className="panel">
                <Header
                  title="House" 
                  color={ this.props.color } 
                  value={ this.state.value } 
                  unit="V" 
                  onClick={ this.props.onClick }
                  />
                  
                  <Bar 
                    scores={ this.props.data.map(elem => parseFloat(elem.voltage) * 10 ) } 
                    timestamps={  this.props.data.map(elem => parseInt(elem.timestamp) ) } 
                    color={ this.props.color } />
            </div>
          )

        case 2:
          return (
            <div className="panel">
              <Header
                title="House" 
                color={ this.props.color } 
                value={ this.state.value } 
                unit="V" 
                onClick={ this.props.onClick }
                />
            </div>
          )
          
        case 3:
          return (
            <div className="panel">
              <Header
                title="House" 
                color={ this.props.color } 
                value="Settings"
                unit="" 
                onClick={ this.props.onClick }
                />
            </div>
          )

        default:
          return (<div></div>)
    }
  }

  render () {
      let currentView = this.returnCurrentView()
      console.log( this.props.data )

      return (
        <div>
          { currentView }
        </div>
      )
  }
}

export default House