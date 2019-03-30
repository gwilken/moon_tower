import RPi.GPIO as GPIO
import subprocess
import time

def shutdown(self):
    start = time.time()
    elapsed = 0
    
    while GPIO.input(12) == GPIO.LOW:
      elapsed = time.time() - start
      print('Shutdown pin low detected. Elapsed time:', elapsed)

      if elapsed > 5:
        print('Shutting down:', time.time())
        subprocess.run(['sudo', 'shutdown', 'now'])
      
      time.sleep(1)
 
try:
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(12, GPIO.IN)
    GPIO.add_event_detect(12, GPIO.FALLING, callback=shutdown, bouncetime=200)
    
    while True:
      time.sleep(1)

finally:
    GPIO.cleanup()