import requests
data = requests.get('http://mnsapi.ddns.net:3001/getmode/client2')
print(data.text)
print("hi")