import RPi.GPIO as GPIO
import subprocess
import time

def shutdown():
    start = time.time()
    elapsed = 0
    
    while GPIO.input(12) == GPIO.HIGH:
      elapsed = time.time() - start
      print('ELAPSED:', elapsed)
      
      if elapsed > 5:
        subprocess.run(['echo', 'howdy! Shutting down...'])
      
      time.sleep(1)
 
try:
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(12, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    GPIO.add_event_detect(12, GPIO.RISING, callback=shutdown, bouncetime=200)
    
    while True:
      time.sleep(1)

finally:
    GPIO.cleanup()