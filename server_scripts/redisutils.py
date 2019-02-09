import time
import redis

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


#creates a hash map of values and adds key of that map to a sorted set of timestamps
def add_hash_update_set(set, values, expire):
    print values
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
        r.expire(hashname, 10)

    except Exception as e:
        print('Error setting Redis hash:', e)


#deletes all keys of a sorted set before now
def clear_sorted_set(set):
    timestamp = int(time.time())

    try:
        r.zremrangebyscore(set, 0, timestamp)

    except Exception as e:
        print('Error deleting element of set:', e)


r = connect_redis()


while not r:
    print('Attemping Redis reconnect in 1 sec')
    time.sleep(1)
    r = connect_redis()
