from redisutils import *
import json
import polyline
import time

with open('moon_config.json', 'r') as f:
    config = json.load(f)


def build_polyline(start, stop):
  timestamp = int(time.time())
 
  test = r.zrevrange('gps-set', 0, 0)
  print(test)

  hashlist = r.zrangebyscore('gps-set', start, stop)
  coords = []
  for hash in hashlist:
    lat = r.hget(hash, 'lat')
    lon = r.hget(hash, 'lon')
    print(lat, lon)
    coord = (float(lat), float(lon))
    coords.append(coord)
  
  return polyline.encode(coords)

print(build_polyline( 1552260103, 1552260193 ))