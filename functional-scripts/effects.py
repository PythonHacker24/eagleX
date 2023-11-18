import requests

NODEMCU_IP = "192.168.18.223"
while True:
    for i in range(0, 50):    
        requests.post(f'http://{NODEMCU_IP}/sound', data={'value': i})

    for i in range(0, 50):
        requests.post(f'http://{NODEMCU_IP}/sound', data={'value': 50 - i})

 


