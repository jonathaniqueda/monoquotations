#!/bin/bash -ex

SERVICE_PATH=$1;
SERVICE_PATH_ARR=(${SERVICE_PATH//\// })

SERVICE_NAME=${SERVICE_PATH_ARR[1]}


docker build -f Dockerfile -t baseimage .

cd $SERVICE_PATH;

docker build -f Dockerfile -t $SERVICE_NAME | tr '[:upper:]' '[:lower:]' .
docker run --rm -e PORT=3002 -p 3002:3002 ${SERVICE_NAME}
