FROM baseimage

ARG PORT

WORKDIR /app

RUN mkdir -p src/set-quotation
ADD . src/set-quotation

RUN lerna bootstrap --scope 'set-quotation' --loglevel=silly --hoist

WORKDIR /app/src/set-quotation

#CMD ["npm", "run", "build"]

EXPOSE 3002
CMD ["npm", "run", "start"]
