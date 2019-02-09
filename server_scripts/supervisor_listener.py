from redisutils import *
import json
import xmlrpclib

time.sleep(10)

server = xmlrpclib.Server('http://192.168.2.3:9001/RPC2')

while True:
  status = { "proceses": json.dumps(server.supervisor.getAllProcessInfo() )}
  add_hash_update_set('supervisor', status, 10)
  #add_system_hash('supervisor', status)
  time.sleep(2)