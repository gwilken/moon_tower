import time
import redis
import polyline

#connect to local redis
def connect_redis():
    try:
        s = redis.Redis(host='localhost', port=6379)
        s.ping()
        print('Connected to Redis.')
        return s
    except:
        print("Failed to connect to Redis.")
        return None


def get_hash(hashname):
    obj = r.hgetall(hashname)
    obj['redis']['hashkey'] = hashname
    return obj


def get_last_hash(setname):
    hashkey = r.zrevrange(setname, 0, 0)
    hashobj = r.hgetall(hashkey[0])
    jsonobj = {}

    for key in hashobj.keys():
        jsonobj[key.decode('utf-8')] = hashobj[key].decode('utf-8')

    jsonobj['redis']['hashkey'] = hashkey[0].decode('utf-8')
    jsonobj['redis']['set'] = setname
    return jsonobj


#creates a hash map of values and adds key of that map to a sorted set of timestamps
def add_hash_update_set(set, values, expire):
    timestamp = int(time.time())
    values['timestamp'] = timestamp
    values['parent'] = set
    hashkey = set + '-hash-' + str(timestamp)
  
    try:
        r.zadd(set + '-set', hashkey, timestamp )
        r.hmset(hashkey, values)
        r.expire(hashkey, expire)

    except Exception as e:
        print('Error setting Redis keys:', e)


#update system set and create hash
def set_hash(hashname, values, expires):
    timestamp = int(time.time())
    values['timestamp'] = timestamp
    values['parent'] = 'system'
    values['type'] = hashname

    try:
        r.hmset(hashname, values)
        r.expire(hashname, expires)

    except Exception as e:
        print('Error setting Redis hash:', e)


#deletes all keys of a sorted set before now
def clear_sorted_set(set):
    timestamp = int(time.time())

    try:
        r.zremrangebyscore(set, 0, timestamp)

    except Exception as e:
        print('Error deleting element of set:', e)


def build_polyline(start, stop):
  hashlist = r.zrangebyscore('gps-set', start, stop)
  coords = []
  for hash in hashlist:
    lat = r.hget(hash, 'lat')
    lon = r.hget(hash, 'lon')
    
    if lat is not None and lon is not None:
        coord = (float(lat), float(lon))
        coords.append(coord)
  
    obj = polyline.encode(coords)
    obj['redis']['hashkey'] = 'last-polyline'
    return obj


r = connect_redis()


while not r:
    print('Attemping Redis reconnect in 1 sec')
    time.sleep(1)
    r = connect_redis()