from Hologram.HologramCloud import HologramCloud
from redisutils import *
import requests

#r = requests.get('https://api.github.com/events')  
#clo  print(r.content)

lastgps = get_last_hash('gps-set')

r = requests.post('http://localhost:4000/api/key/', json = lastgps)
