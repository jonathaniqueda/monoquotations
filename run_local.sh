#!/bin/bash -ex

SERVICE_PATH=$1;
SERVICE_PORT=$2;
SERVICE_PATH_ARR=(${SERVICE_PATH//\// })

SERVICE_NAME=${SERVICE_PATH_ARR[1]}


docker build -f Dockerfile -t baseimage .

cd $SERVICE_PATH;

docker build -f Dockerfile -t $SERVICE_NAME .
docker run --rm -e PORT=${SERVICE_PORT} -p ${SERVICE_PORT}:${SERVICE_PORT} ${SERVICE_NAME}
