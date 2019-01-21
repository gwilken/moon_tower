import { pushAndShiftData } from '../js/actions.js'
import store from '../js/store'

const ws = new WebSocket('ws://localhost:8080')

ws.onmessage = (event) => {
    try {
        let data = JSON.parse(event.data)

        // if (data.parent) {
        //     switch(data.parent) {
        //         case 'gps':
        //             //store.dispatch(pushAndShiftData)
        //     }

        // }

        console.log(data)

        //TODO: dispatch event to store
    } catch (err) {
        console.log(err)
    }
}