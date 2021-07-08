FROM baseimage

ARG PORT

WORKDIR /app

RUN mkdir -p src/setQuotation
ADD . src/setQuotation

RUN lerna bootstrap --scope 'set-quotation' --hoist

WORKDIR /app/src/setQuotation

CMD ["npm", "run", "build"]

#EXPOSE 3002
#CMD ["npm", "run", "start"]
