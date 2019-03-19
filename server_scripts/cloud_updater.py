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

UPDATE_INTERVAL = 1800
KEY_EXPIRE = 86400 * 30

with open('moon_config.json', 'r') as f:
    config = json.load(f)


def send_data():
  last_success = r.get('last-cloud-update-success')
  
  if last_success is None:
    last_success = time.time()

  lastroute = build_polyline( last_success, time.time() )

  data = { 
    "device": "moontower",
    "last-route": lastroute,
    "gps": get_last_hash('gps-set'),
    "solar": get_last_hash('solar-set'),
    "house": get_last_hash('house-set'),
    "supervisor": get_hash('supervisor')
  }

  try:
    credentials = {'devicekey': config['cellular']['device_key']}
    hologram = HologramCloud(credentials, network='cellular', authentication_type='totp') 
    hologram.network.modem = 'ms2131'

    did_connect = hologram.network.connect()
    
    local_ip = hologram.network.modem.localIPAddress
    remote_ip = hologram.network.modem.remoteIPAddress

    res_code = hologram.sendMessage(json.dumps(data), topics=["MOONTOWER"])

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
   # hologram.network.disconnect()
    print('Error:', e)
    return {}

while True:
  set_hash('cloud', send_data(), KEY_EXPIRE)
  time.sleep(UPDATE_INTERVAL)