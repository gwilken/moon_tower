from Hologram.CustomCloud import CustomCloud
from redisutils import *
import requests

#r = requests.get('https://api.github.com/events')  
#clo  print(r.content)

mooncontrol = CustomCloud(dict(), send_host='gwilken.com', send_port=4000)

lastgps = get_last_hash('gps-set')

mooncontrol.sendMessage(lastgps, timeout = 10)

#r = requests.post('http://gwilken.com:4000/api/key/', json = lastgps)
