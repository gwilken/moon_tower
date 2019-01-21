from redisutils import *
import socket
import fcntl
import json
import struct

with open('moon_config.json', 'r') as f:
    config = json.load(f)

LISTEN_PORT = config['cellular']['listen_port']
SEND_PORT = config['cellular']['send_port']
URL = config['cellular']['url']
BUFFER_SIZE = config['cellular']['buffer_size']

server_socket = socket.socket()

def get_ip_address(ifname):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(fcntl.ioctl(
        s.fileno(),
        0x8915,  # SIOCGIFADDR
        struct.pack('256s', ifname[:15])
    )[20:24])

ip = get_ip_address('wwan0')

print 'Listening at:', ip, ':', LISTEN_PORT

server_socket.bind((get_ip_address('wwan0'), LISTEN_PORT))
server_socket.listen(1)
(client_socket, client_address) = server_socket.accept()

while True:
        client_input = client_socket.recv(1024).upper()
        if(client_input):
                print client_input

    if (client_input == "send"):
        print 'got send cmd'
        
       # lat = r.lrange('gps-lat', 0, 1)
        
        test = "test message..."

        payload = {
                        'k':'WC]A@>i&',
                        'd':test,
                        't':'TEST'
                }

        msg = json.dumps(payload)

        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind((ip, 0))

        s.connect((URL, SEND_PORT))
        s.sendall(msg)

        r = s.recv(BUFFER_SIZE)
        s.close

