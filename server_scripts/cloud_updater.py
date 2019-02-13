from Hologram.CustomCloud import CustomCloud
from Hologram.Network.Modem.MS2131 import MS2131
#from Hologram import *
from redisutils import *
import requests
import json
import time


mooncontrol = CustomCloud(None, send_host='www.gwilken.com', send_port=4000, network='cellular')

#res = mooncontrol.network.modem.connect(None, 9600, '/etc/ppp/chatscripts/ms2131')

#print mooncontrol.network.modem.mode

modem = MS2131('/dev/ttyUSB0', 9600, '/etc/ppp/chatscripts/ms2131')
 
modem.connect()

#  result1 = mooncontrol.network.connect()

# print "result1=", result1

# print "first CONNECTION STATUS:" + str(mooncontrol.network.getConnectionStatus())

# resp = mooncontrol.sendMessage("abc")

# print "resp=", resp
# print "second CONNECTION STATUS:" + str(mooncontrol.network.getConnectionStatus())



#r = requests.get('https://api.github.com/events')  
#clo  print(r.content)



lastgps = get_last_hash('gps-set')

res = mooncontrol.sendMessage("TEST TEST TEST", timeout = 30)

print(res)

time.sleep(30)

#r = requests.post('http://gwilken.com:4000/api/key/', json = lastgps)
