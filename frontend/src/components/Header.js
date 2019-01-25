import React from 'react'

const Header = (props) => {
  return (
    <div className="panel-header">
      <div className="panel-title">
        { props.title }
    
        <div 
          className="view-button" 
          onClick={ () => props.onClick() }>
          &#8759;
        </div>     
      </div>
      <div className="panel-rt-container">
        <div className="panel-rt">{ props.value }</div>
        <div className="panel-rt-label">{ props.unit }</div>
      </div>
    </div>
  )
}

export default Header