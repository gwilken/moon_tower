from redisutils import *
import json
import xmlrpclib

server = xmlrpclib.Server('http://192.168.2.3:9001/RPC2')
status = { "proceses": server.supervisor.getAllProcessInfo() }

while True:
  add_record('supervisor', status)
  time.sleep(10)
    