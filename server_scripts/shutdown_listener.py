from gpiozero import Button
from signal import pause

button = Button(12)

def hello():
  print("Button pressed!")

#button.when_pressed = hello()

print(button)

pause()