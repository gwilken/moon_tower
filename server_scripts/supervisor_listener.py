from redisutils import *
import json
import xmlrpclib

server = xmlrpclib.Server('http://192.168.2.3:9001/RPC2')

while True:
  status = { "proceses": server.supervisor.getAllProcessInfo() }
  add_hash('supervisor-hash', status)
  time.sleep(2)