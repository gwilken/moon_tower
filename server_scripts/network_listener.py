from redisutils import *
import socket
import fcntl
import struct

def get_ip_address(ifname):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(fcntl.ioctl(
        s.fileno(),
        0x8915,  # SIOCGIFADDR
        struct.pack('256s', ifname[:15])
    )[20:24])

def is_connected():
  try:
    host = socket.gethostbyname('www.gwilken.com')
    s = socket.create_connection((host, 80), 2)
    return True
  except:
     pass
  return False

while True:
  status = { 
    "connected": is_connected(),
    "wwanIp": get_ip_address('wwan0') 
  }
  
  add_hash_update_set('network', status, 10 )
  #add_system_hash('network', status)
  time.sleep(2)