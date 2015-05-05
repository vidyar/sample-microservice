#!/bin/bash -x
title='microbe'
port=61590
apiUrl='https://api.shippable.com'

echo "Using port " $port
echo "Using API located at " $apiUrl

ids=$(sudo docker ps | grep $title | awk '{print $1}')

echo "Reprovisioning " $title " container(s)" ${ids}
sudo docker stop -t=0 ${ids}
sudo docker rm -f ${ids}
sudo docker build --rm=true -t $title .
mkdir -p logs
npm install
id=$(sudo docker run -d --name=$title --privileged=true --restart=always \
    --net=host \
    -e MICRO_SERVICE_NAME=$title \
    -e API_URL=$apiUrl \
    -e RUN_MODE=dev \
    -e PORT=$port \
    -p $port:$port \
    -v $(pwd):/home/$title:rw \
    -t $title)
echo "$title container started with ID" ${id}
sleep 2s && sudo docker logs ${id}
