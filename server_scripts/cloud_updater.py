from Hologram.HologramCloud import HologramCloud
from redisutils import *
import json
import time

HOLOGRAM_REPSONSE_CODES = [
  'ERR_OK',
  'ERR_CONNCLOSED',
  'ERR_MSGINVALID', 
  'ERR_AUTHINVALID', 
  'ERR_PAYLOADINVALID', 
  'ERR_PROTINVALID', 
  'ERR_INTERNAL', 
  'ERR_UNKNOWN'
]

UPDATE_INTERVAL = 900
KEY_EXPIRE = 86400 * 30

with open('moon_config.json', 'r') as f:
  config = json.load(f)


def send_data():
  last_success = r.get('last-cloud-update-success')
  
  if last_success is None:
    last_success = time.time()

  lastroute = None;

  try:
    lastroute = build_polyline( last_success, time.time() )  

  data = { 
    "deviceId": "moontower",
    "key": "coldbeer",
    "data": {
      "last-polyline": lastroute,
      "gps": get_last_hash('gps-set'),
      "solar": get_last_hash('solar-set'),
      "house": get_last_hash('house-set'),
      "supervisor": get_hash('supervisor')
    }
  }

  hologram = None

  try:
    credentials = {'devicekey': config['cellular']['device_key']}
    hologram = HologramCloud(credentials, network='cellular', authentication_type='totp') 
    hologram.network.modem = 'ms2131'

    did_connect = hologram.network.connect()
    
    print('Hologram connect status:', did_connect)

    local_ip = hologram.network.modem.localIPAddress
    remote_ip = hologram.network.modem.remoteIPAddress

    res_code = hologram.sendMessage(json.dumps(data), topics=["MOONTOWER"])

    print('Hologram send message status:', HOLOGRAM_REPSONSE_CODES[res_code])

    if res_code == 0:
      timestamp = int(time.time())
      r.set('last-cloud-update-success', timestamp)


    hologram.network.disconnect()

    return {
      "ableToConnect": str(did_connect),
      "messageResponseCode": HOLOGRAM_REPSONSE_CODES[res_code],
      "localIp": str(local_ip),
      "remoteIp": str(remote_ip),
      "updateInterval": UPDATE_INTERVAL
    }

  except Exception as e:
    print('Error:', e)
    hologram.network.disconnect()

while True:
  data = send_data()
  print('Cloud update status:', data)
  set_hash('cloud', data, KEY_EXPIRE)
  time.sleep(UPDATE_INTERVAL)