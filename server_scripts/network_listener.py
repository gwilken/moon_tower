from redisutils import *
import socket

def is_connected():
  try:
    host = socket.gethostbyname('www.gwilken.com')
    s = socket.create_connection((host, 80), 2)
    return True
  except:
     pass
  return False

while True:
  status = { "connected": is_connected() }
  add_system_hash('network', status)
  time.sleep(2)