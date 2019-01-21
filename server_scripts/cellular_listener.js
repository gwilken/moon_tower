const net = require('net');

let config = {
  "listen_port": 4010,
  "send_port": 9999,
  "url": "cloudsocket.hologram.io",
  "buffer_size": 1024
}

let server = net.createServer(client => {
  console.log('client connected.')

  client.on('data', data => {
    console.log(data.toString('utf8'))
  })
//	socket.write('Echo server\r\n');
//	socket.pipe(socket);
});

server.listen(4010, '127.0.0.1');
