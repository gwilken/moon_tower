import socket
import fcntl
import json
import struct
import redis

LISTEN_PORT = 4010
URL, SEND_PORT = 'cloudsocket.hologram.io', 9999
BUFFER_SIZE = 1024

server_socket = socket.socket()

def connectRedis():
        try:
                s = redis.Redis(host='localhost', port=6379)
                s.ping()
                print 'Connected to Redis.'
                return s
        except:
                print "Failed to connect to Redis."
                return None

def get_ip_address(ifname):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(fcntl.ioctl(
        s.fileno(),
        0x8915,  # SIOCGIFADDR
        struct.pack('256s', ifname[:15])
    )[20:24])


r = connectRedis()
ip = get_ip_address('wwan0')

print 'Listening at:', ip, ':', LISTEN_PORT

server_socket.bind((get_ip_address('wwan0'), LISTEN_PORT))
server_socket.listen(1)
(client_socket, client_address) = server_socket.accept()

while True:
    client_input = client_socket.recv(1024).upper()

    if (client_input == "send"):
        print 'got send cmd'
        
        lat = r.lrange('gps-lat', 0, 1)
  
        payload = {'k':'WC]A@>i&','d':lat,'t':'TEST'}
        msg = json.dumps(payload)

        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind((ip, 0))

        s.connect((URL, SEND_PORT))
        s.sendall(msg)

        r = s.recv(BUFFER_SIZE)
        s.close

