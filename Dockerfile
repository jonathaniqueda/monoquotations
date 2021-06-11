FROM node:14-alpine

RUN mkdir -p /app
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./lerna.json /app/lerna.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./packages /app/packages

RUN npm install -g lerna

#RUN lerna bootstrap --scope '@packages/*' --hoist
