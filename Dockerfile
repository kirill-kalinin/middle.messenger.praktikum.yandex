FROM ubuntu:18.04
RUN apt update && apt install -y nodejs && apt install -y npm
RUN npm install express
WORKDIR /var/www
COPY ./dist ./dist
COPY ./server.js server.js
EXPOSE 4000
CMD node server.js
