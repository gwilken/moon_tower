# coding=utf-8
 
import RPi.GPIO as GPIO
import subprocess
import time

def shutdown(channel):
    #if GPIO.input(12) == GPIO.HIGH:
    start = time.time()
    elapsed = 0
    
    while GPIO.input(12) == GPIO.HIGH:
      elapsed = time.time() - start
      print('ELAPSED:', elapsed)
      time.sleep(1)
      #print('SHUTTING DOWN')
 
try:
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(12, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    GPIO.add_event_detect(12, GPIO.RISING, callback=shutdown, bouncetime=200)
 
    message = raw_input('\nPress any key to exit.\n')
 
finally:
    GPIO.cleanup()
 
print("Goodbye!")