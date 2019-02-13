from Hologram.CustomCloud import CustomCloud
from redisutils import *
import requests
import json
import time

#r = requests.get('https://api.github.com/events')  
#clo  print(r.content)

mooncontrol = CustomCloud(None, send_host='www.gwilken.com', send_port=4000, network='cellular')

lastgps = get_last_hash('gps-set')

res = mooncontrol.sendMessage("TEST TEST TEST", timeout = 30)
print(res)

time.sleep(30)

#r = requests.post('http://gwilken.com:4000/api/key/', json = lastgps)
