FROM baseimage

ARG PORT

WORKDIR /app

RUN mkdir -p src/quotation-metrics
ADD . src/quotation-metrics

RUN lerna bootstrap --scope 'quotation-metrics' --loglevel=silly --hoist

WORKDIR /app/src/quotation-metrics

#CMD ["npm", "run", "build"]

#EXPOSE 3002
CMD ["npm", "run", "start"]
