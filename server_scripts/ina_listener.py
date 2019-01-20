#!/usr/bin/env python
from redisutils import *
import json
from ina219 import INA219
from ina219 import DeviceRangeError

with open('moon_config.json', 'r') as f:
    config = json.load(f)

SHUNT_OHMS = config['power']['shunt_ohms']
MAX_EXPECTED_AMPS = config['power']['max_expected_amps']
REDIS_WINDOW = config['power']['redis_window']
POLLING_FREQ = config['power']['polling_freq']
REDIS_SOCKET = config['redis']['socket']


def read_house_data():
    inaHouse = INA219(SHUNT_OHMS, MAX_EXPECTED_AMPS, address=0x40)
    inaHouse.configure(inaHouse.RANGE_16V, inaHouse.GAIN_AUTO)

    try:
        data = {
            'voltage': inaHouse.voltage(),
            'current': inaHouse.current(),
            'power': inaHouse.power(),
            'shunt': inaHouse.shunt_voltage()
        }
    
        return data

    except Exception as e:
        print 'Error reading house ina219 data:', e


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
    add_record( 'house', read_house_data() )
    add_record( 'solar', read_solar_data() )
    time.sleep(POLLING_FREQ)
