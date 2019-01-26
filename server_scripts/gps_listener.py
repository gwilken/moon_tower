#!/usr/bin/env python

from redisutils import *
from gps3 import gps3
import json


with open('moon_config.json', 'r') as f:
    config = json.load(f)

GPS_UPDATE = config['gps']['polling_freq']

def unpack_gps_data():
    try:        
        for new_data in gps_socket:
            if new_data:
                data_stream.unpack(new_data)

                try:
                    gps_data = {
                        'latitude': data_stream.TPV['lat'],
                        'longitude': data_stream.TPV['lon'],
                        'mode': data_stream.TPV['mode'],
                        'time': data_stream.TPV['time'],
                        'alt': data_stream.TPV['alt'],
                        'track': data_stream.TPV['track'],
                        'speed': data_stream.TPV['speed']  
                    }

                    return gps_data

                except Exception as e:
                    print 'Error setting redis gps keys:', e
            
    except Exception as e:
        print 'Error unpacking gps stream:', e

    return None

gps_socket = gps3.GPSDSocket()
data_stream = gps3.DataStream()

gps_socket.connect()
gps_socket.watch()

while True:
    print unpack_gps_data()
    add_hash_update_set( 'gps', unpack_gps_data() )
    time.sleep(GPS_UPDATE)
