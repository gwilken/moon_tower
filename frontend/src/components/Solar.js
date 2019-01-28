import React, { Component } from 'react'
import Header from './Header'
import Bar from './BarChart'


class Solar extends Component {
  constructor(props) {
      super()

      this.state = {
        value: 240,
        unit: 'mA'
      }
  }
  
  returnCurrentView = () => {
    let window = this.props.window * -1

    switch (this.props.currentView) {
      case 0:
        return (
          <div className="panel">
              <Header
                title="Solar" 
                color={ this.props.color } 
                value={ this.props.data.length > 1 ? parseFloat(this.props.data[this.props.data.length - 1].current).toFixed(0) : null } 
                unit="mA" 
                onClick={ this.props.onClick }
                />
                
                <Bar 
                  scores={ this.props.data.slice(window).map(elem => parseInt(elem.current).toFixed(0 )) } 
                  timestamps={  this.props.data.slice(window).map(elem => parseInt(elem.timestamp) ) } 
                  color={ this.props.color }
                  height='full' />
          </div>
        )
      
        case 1:
          return (
            <div className="panel">
                <Header
                  title="Solar" 
                  color={ this.props.color } 
                  value={ this.props.data.length > 1 ? parseFloat(this.props.data[this.props.data.length - 1].voltage).toFixed(2) : null } 
                  unit="V" 
                  onClick={ this.props.onClick }
                  />
                  
                  <Bar 
                    scores={ this.props.data.map(elem => parseFloat(elem.voltage) * 10 ) } 
                    timestamps={  this.props.data.map(elem => parseInt(elem.timestamp) ) } 
                    color={ this.props.color } 
                    height='full'/>
            </div>
          )

        case 2:
          return (
            <div className="panel">
              <Header
                title="Solar" 
                color={ this.props.color } 
                value={ this.props.data.length > 1 ? parseFloat(this.props.data[this.props.data.length - 1].current).toFixed(0) : null } 
                unit="mA" 
                onClick={ this.props.onClick }
                />
                
                <Bar 
                  scores={ this.props.data.slice(window).map(elem => parseInt(elem.current).toFixed(0 )) } 
                  timestamps={  this.props.data.slice(window).map(elem => parseInt(elem.timestamp) ) } 
                  color={ this.props.color } 
                  height='half'/>

                <Bar 
                  scores={ this.props.data.map(elem => parseFloat(elem.voltage) * 10 ) } 
                  timestamps={  this.props.data.map(elem => parseInt(elem.timestamp) ) } 
                  color={ this.props.color } 
                  height='half'/>
            </div>
          )
          
        case 3:
          return (
            <div className="panel">
              <Header
                title="Solar" 
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

      return (
        <div>
          { currentView }
        </div>
      )
  }
}

export default Solar