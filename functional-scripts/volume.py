import sounddevice as sd
import numpy as np
import requests

class Smoother:
    def __init__(self, window_size):
        self.window_size = window_size
        self.values = []

    def smooth(self, value):
        self.values.append(value)
        if len(self.values) > self.window_size:
            self.values = self.values[-self.window_size:]
        return sum(self.values) / len(self.values)


window_size = 10  # Adjust the window size based on your preferences
smoother = Smoother(window_size)

NODEMCU_IP = "192.168.18.223"

def callback(indata, frames, time, status):
    if status:
        print(status)
    volume_norm = np.linalg.norm(indata) * 10
#    smoothed_value = smoother.smooth(volume_norm)
 #   print(f"Smoothed Volume: {smoothed_value}")
    requests.post(f'http://{NODEMCU_IP}/sound', data={'value': volume_norm})

with sd.InputStream(callback=callback):
    sd.sleep(1000000)

