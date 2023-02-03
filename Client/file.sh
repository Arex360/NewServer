# Create a file with the base64 encoded string
base64 -w 0 picture1.jpg >> base64_string.txt
#echo $base64_string >> base64_string.txt

# Pass the file path to curl
curl -r POST http://mnsstrap.ddns.net:5000/postImage \
-H 'Content-Type: application/json' \
-d "{\"base64\": \"$(cat base64_string.txt)\", \"client\": \"owais\"}"
