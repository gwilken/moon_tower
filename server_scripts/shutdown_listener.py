# coding=utf-8
 
import RPi.GPIO as GPIO
import subprocess

def shutdown(channel):
    if GPIO.input(12) == GPIO.HIGH:
        print('SHUTTING DOWN')
 
try:
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(12, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    GPIO.add_event_detect(12, GPIO.RISING, callback=shutdown, bouncetime=200)
 
    message = raw_input('\nPress any key to exit.\n')
 
finally:
    GPIO.cleanup()
 
print("Goodbye!")