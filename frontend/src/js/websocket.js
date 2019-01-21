const ws = new WebSocket('ws://192.168.2.3:8080')

ws.onmessage = (event) => {
    try {
        let data = JSON.parse(event.data)
        console.log(data)

        //TODO: dispatch event to store
    } catch (err) {
        console.log(err)
    }
}