#!/usr/bin/env python

from redisutils import *
from gps3 import gps3
import json

with open('moon_config.json', 'r') as f:
    config = json.load(f)

GPS_UPDATE = config['gps']['polling_freq']

gps_socket = gps3.GPSDSocket()
data_stream = gps3.DataStream()

gps_socket.connect()
gps_socket.watch()

def unpack_gps_data():
    try:        
        for new_data in gps_socket:
            if new_data:
                try:
                    data_stream.unpack(new_data)
                    return data_stream.TPV

                except Exception as e:
                    print 'Error setting redis gps keys:', e
            
    except Exception as e:
        print 'Error unpacking gps stream:', e


while True:
    add_hash_update_set( 'gps', unpack_gps_data() )
    time.sleep(GPS_UPDATE)
