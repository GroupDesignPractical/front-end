FROM mhart/alpine-node
WORKDIR /opt/market-junction
ADD . .

RUN npm install

EXPOSE 3000

CMD ["sh", "-c", "npm install && npm start"]
