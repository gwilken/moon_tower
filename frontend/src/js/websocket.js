const ws = new WebSocket('ws://localhost:8081')

ws.onmessage = (event) => {
    try {
        let data = JSON.parse(event.data)
        console.log(data)

        //TODO: dispatch event to store
    } catch (err) {
        console.log(err)
    }
}