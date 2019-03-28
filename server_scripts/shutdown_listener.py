# coding=utf-8
 
import RPi.GPIO as GPIO
import datetime
 
def my_callback(channel):
    if GPIO.input(12) == GPIO.HIGH:
        print('\n▼  at ' + str(datetime.datetime.now()))
    else:
        print('\n ▲ at ' + str(datetime.datetime.now()))
 
try:
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(12, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    GPIO.add_event_detect(12, GPIO.BOTH, callback=my_callback)
 
    message = raw_input('\nPress any key to exit.\n')
 
finally:
    GPIO.cleanup()
 
print("Goodbye!")