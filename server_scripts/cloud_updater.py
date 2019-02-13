from Hologram.CustomCloud import CustomCloud
from Hologram import NetworkManager
from redisutils import *
import requests
import json

#r = requests.get('https://api.github.com/events')  
#clo  print(r.content)

mooncontrol = CustomCloud(None, send_host='www.gwilken.com', send_port=4000, network='cellular')

nm = NetworkManager()

print 'Available network interfaces:'
print nm.listAvailableInterfaces()

lastgps = get_last_hash('gps-set')

res = mooncontrol.sendMessage("TEST TEST TEST", timeout = 30)

print(res)

#r = requests.post('http://gwilken.com:4000/api/key/', json = lastgps)
