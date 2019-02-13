from Hologram.CustomCloud import CustomCloud
from redisutils import *
import requests
import json

#r = requests.get('https://api.github.com/events')  
#clo  print(r.content)

mooncontrol = CustomCloud(dict(), send_host='gwilken.com', send_port=4000)

lastgps = get_last_hash('gps-set')

res = mooncontrol.sendMessage("TEST TEST TEST", timeout = 10)

print(res)

#r = requests.post('http://gwilken.com:4000/api/key/', json = lastgps)
