from Hologram.CustomCloud import CustomCloud
from redisutils import *
import requests
import json
import time


mooncontrol = CustomCloud(None, send_host='www.gwilken.com', send_port=4000, network='cellular')

print “version and type=”, mooncontrol.version, mooncontrol.network_type

result1 = mooncontrol.network.connect()

print “result1=”,result1

print 'first CONNECTION STATUS: ’ + str(mooncontrol.network.getConnectionStatus())

resp = mooncontrol.sendMessage(“abc”)

print “resp=”,resp
print 'second CONNECTION STATUS: ’ + str(mooncontrol.network.getConnectionStatus())



#r = requests.get('https://api.github.com/events')  
#clo  print(r.content)



lastgps = get_last_hash('gps-set')

#res = mooncontrol.sendMessage("TEST TEST TEST", timeout = 30)

# print(res)

#time.sleep(30)

#r = requests.post('http://gwilken.com:4000/api/key/', json = lastgps)
