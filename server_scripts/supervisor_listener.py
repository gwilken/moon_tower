from redisutils import *
import json
import xmlrpclib

server = xmlrpclib.Server('http://192.168.2.3:9001/RPC2')
status = { "proceses": server.supervisor.getAllProcessInfo() }

while True:
  # add_hash_update_set('supervisor', status)

  try:
    for key, value in status.items():
      r.hset('supervisor-hash', key, value)
      r.expire(hashkey, 86400)

  except Exception as e:
      print('Error setting Redis keys:', e)
      
  time.sleep(10)