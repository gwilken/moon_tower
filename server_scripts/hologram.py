import socket
import json
import fcntl
import struct

URL, PORT = 'cloudsocket.hologram.io', 9999
BUFFER_SIZE = 1024

def get_ip_address(ifname):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(fcntl.ioctl(
        s.fileno(),
        0x8915,  # SIOCGIFADDR
        struct.pack('256s', ifname[:15])
    )[20:24])

payload = {'k':'WC]A@>i&','d':'McFly???!','t':'TEST'}
r = json.dumps(payload)

print get_ip_address('wwan0')

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((get_ip_address('wwan0'), 0))

s.connect((URL, PORT))
s.sendall(r)

r = s.recv(BUFFER_SIZE)
s.close

print r
