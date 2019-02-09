from redisutils import *
import json
import xmlrpclib

time.sleep(10)

server = xmlrpclib.Server('http://192.168.2.3:9001/RPC2')

while True:
  status = { "proceses": json.dumps(server.supervisor.getAllProcessInfo() )}
  set_hash('supervisor', status, 10)
  time.sleep(2)