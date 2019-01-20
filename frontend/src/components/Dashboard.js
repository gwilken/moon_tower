import React from 'react'

const style = {
    display: 'grid',
    gridTemplateRows: '[row-1] 50% [row-2] 50%' ,
    gridTemplateColumns: '[col-1] 50% [col-2] 50%',
    height: '100vh'
}

const Dashboard = (props) => {
    return (
        <div style={ style }>
            { props.children }
        </div>
    )
}

export default Dashboard