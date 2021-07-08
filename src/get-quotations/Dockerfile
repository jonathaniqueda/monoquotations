FROM baseimage

ARG PORT

WORKDIR /app

RUN mkdir -p src/get-quotations
ADD . src/get-quotations

RUN lerna bootstrap --scope 'get-quotations' --loglevel=silly --hoist

WORKDIR /app/src/get-quotations

#CMD ["npm", "run", "build"]

#EXPOSE 3002
CMD ["npm", "run", "start"]
