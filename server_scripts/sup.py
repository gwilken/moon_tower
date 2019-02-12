from redisutils import * 
import json
from xmlrpc.client import ServerProxy

server = ServerProxy('http://192.168.2.3:9001/RPC2')

x = server.supervisor.getAllProcessInfo()

add_record('supervisor', x[0])

