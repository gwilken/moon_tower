#!/usr/bin/env python

from redisutils import *
import json
import gps
 
# Listen on port 2947 (gpsd) of localhost
session = gps.gps("localhost", "2947")
session.stream(gps.WATCH_ENABLE | gps.WATCH_NEWSTYLE)
 
def unpack_gps_data():
    try:
        report = session.next()
 
        if report['class'] == 'TPV':
            print(report)
            return report
    except:
        return

while True:
    unpack_gps_data()
   # add_hash_update_set( 'gps', unpack_gps_data() )
    time.sleep(GPS_UPDATE)
