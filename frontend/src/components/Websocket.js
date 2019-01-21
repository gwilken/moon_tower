import { pushData } from '../js/actions.js'
import store from '../js/store'

//raspi pi ip
const ws = new WebSocket('ws://192.168.2.3:8080')

//const ws = new WebSocket('ws://localhost:8080')


ws.onmessage = (event) => {
    try {
        let data = JSON.parse(event.data)

        if (data.parent) {
            store.dispatch( pushData(data, data.parent) )
        }

        console.log(data)

        //TODO: dispatch event to store
    } catch (err) {
        console.log(err)
    }
}