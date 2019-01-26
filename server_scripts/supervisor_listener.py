from redisutils import *
import json
import xmlrpclib

server = xmlrpclib.Server('http://192.168.2.3:9001/RPC2')
status = { "proceses": server.supervisor.getAllProcessInfo() }

while True:
  # add_hash_update_set('supervisor', status)
  for key, value in status.items():
    r.hset('supervisor-hash', key, value)
    r.expire('supervisor-hash', 86400)

  time.sleep(10)