from redisutils import *
import requests

r = requests.get('https://api.github.com/events')  
print(r.content)  