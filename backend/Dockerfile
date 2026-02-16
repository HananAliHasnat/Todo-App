FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Install netcat for wait script
RUN apk add --no-cache netcat-openbsd

EXPOSE 3000

CMD sh -c "until nc -z db 3306; do echo 'Waiting for MySQL...'; sleep 2; done; node server.js"
