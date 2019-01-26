#!/usr/bin/env python
from redisutils import *
import json
from ina219 import INA219
from ina219 import DeviceRangeError

with open('moon_config.json', 'r') as f:
    config = json.load(f)

SHUNT_OHMS = config['solar']['shunt_ohms']
MAX_EXPECTED_AMPS = config['solar']['max_expected_amps']
REDIS_WINDOW = config['solar']['redis_window']
POLLING_FREQ = config['solar']['polling_freq']
REDIS_SOCKET = config['redis']['socket']

def read_solar_data():
    inaSolar = INA219(SHUNT_OHMS, MAX_EXPECTED_AMPS, address=0x44)
    inaSolar.configure(inaSolar.RANGE_16V, inaSolar.GAIN_AUTO)

    try:     
        data = {
            'voltage': inaSolar.voltage(),
            'current': inaSolar.current(),
            'power': inaSolar.power(),
            'shunt': inaSolar.shunt_voltage()
        }
    
        return data

    except Exception as e:
        print 'Error reading solar ina219 data:', e

while True:
    add_hash_update_set( 'solar', read_solar_data() )
    time.sleep(POLLING_FREQ)
