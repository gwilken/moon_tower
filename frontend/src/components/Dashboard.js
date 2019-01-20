import React, { Component } from 'react'
import axios from 'axios'
import { addInitialData } from '../js/actions.js'
import store from '../js/store'

const style = {
    display: 'grid',
    gridTemplateRows: '[row-1] 50% [row-2] 50%' ,
    gridTemplateColumns: '[col-1] 50% [col-2] 50%',
    height: '100vh'
}

class Dashboard extends Component {
    constructor() {
        super()
    }

    componentWillMount() {
        axios.get(`/allkeys`)
            .then(res => this.receivedData(res.data))
    }

    receivedData = (data) => {
        store.dispatch( addInitialData(data, 'solarData') )
    }

    render() {
        return (
            <div style={ style }>
                { this.props.children }
            </div>
        )
    }
}

export default Dashboard