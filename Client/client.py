import asyncio
import websockets
import json
import socket
import re
import sys
import os 
IP=sys.argv[1]
slider=sys.argv[2] ## "1s" --  flash vale 0 100 # "2s"--- power supply 0 and 1  # "3s" --> camera 0 and 1 
state=sys.argv[3]

print(IP)
print(slider)
print(state)

                
async def test():
   # async with websockets.connect('ws://10.42.0.112/ws') as websocket:
    async with websockets.connect("ws://"+IP+"/ws") as websocket: 
        await websocket.send(slider+state)
       # await websocket.send(jsonString)
        response = await websocket.recv()

        m1 = re.search('"sliderValue4":(.+?),', response)
        m2 = re.search('"sliderValue5":(.+?),', response)
        m3 = re.search('"sliderValue6":(.+?),', response)
        m4 = re.search('"sliderValue7":(.+?)}', response)
        print(response)
 
asyncio.get_event_loop().run_until_complete(test())


