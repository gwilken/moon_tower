from redisutils import *
import json
import xmlrpclib

server = xmlrpclib.Server('http://192.168.2.3:9001/RPC2')

x = server.supervisor.getAllProcessInfo()

add_record('supervisor', x[0])

