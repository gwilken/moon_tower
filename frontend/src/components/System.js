import React, { Component } from 'react'
import Header from './Header'

class System extends Component {
  constructor(props) {
      super()

      this.state = {
      }
  }
  
  returnSupervisorList = () => {
    if (this.props.supervisor.proceses) {
      let list = this.props.supervisor.proceses
      console.log(list)
    }
  }

  returnCurrentView = () => {
    switch (this.props.currentView) {
      case 0:
        return (
          <div>
            <h2>Reporting</h2>
            { this.returnSupervisorList() }
          </div>
        )
      
        case 1:
          return (
            <div>                  
            </div>
          )

        case 2:
          return (
            <div>
            </div>
          )
          
        case 3:
          return (
            <div>
            </div>
          )

        default:
          return (<div></div>)
    }
  }

  render () {
    //console.log(this.props)
      let currentView = this.returnCurrentView()

      return (
        <div className="panel">
          <Header
            title="System"
            onClick={ this.props.onClick }
            />
          { currentView }
        </div>
      )
  }
}

export default System