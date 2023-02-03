echo -n '
{
"data": {
  "type": "attachments",
  "attributes": {
    "attachment": {
    "content": "' > /tmp/data.json
base64 -w 0 picture1.jpg >> /tmp/data.json

echo -n '",
    "file_name": "'"$FileName"'"
    }
  }
}
}' >> image.json