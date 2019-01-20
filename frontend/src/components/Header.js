import React, { Component } from 'react'


const Header = (props) => {
    let style = {
        color: 'silver'
    }

    return (
        <div className="panel-header">
            <div className="panel-title">
                { props.title }
            </div>
            <div className="panel-rt-container">
                <div className="panel-rt">{ props.value }</div>
                <div className="panel-rt-label">{ props.unit }</div>
            </div>
        </div>
    )
}

export default Header