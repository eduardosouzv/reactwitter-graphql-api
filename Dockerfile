FROM node:14.16.1-buster-slim

WORKDIR /home/app

COPY package.json .
RUN npm install --loglevel=warn;

COPY . .

EXPOSE 4000

CMD ["npm","run","dev"]