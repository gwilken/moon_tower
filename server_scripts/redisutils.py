import time
import redis

#connect to local redis
def connect_redis():
    try:
        s = redis.Redis(host='localhost', port=6379)
        s.ping()
        print 'Connected to Redis.'
        return s
    except:
        print "Failed to connect to Redis."
        return None


#creates a hash map of values and adds key of that map to a sorted set of timestamps
def add_record(set, values):

    timestamp = int(time.time())
    values['timestamp'] = timestamp
    values['parent'] = set
    hashkey = set + '-hash-' + str(timestamp)

    print hashkey
    
    try:
        r.zadd(set + '-set', hashkey, timestamp )
  
        for key, value in values.items():
            r.hset(hashkey, key, value)

        r.expire(hashkey, 86400)

    except Exception as e:
        print 'Error setting Redis keys:', e


#deletes all keys of a sorted set before now
def clear_sorted_set(set):

    timestamp = int(time.time())

    try:
        r.zremrangebyscore(set, 0, timestamp)

    except Exception as e:
        print 'Error deleting element of set:', e


r = connect_redis()


while not r:
    print 'Attemping Redis reconnect in 1 sec'
    time.sleep(1)
    r = connect_redis()
