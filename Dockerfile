FROM node:6.5.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY . /usr/src/app
RUN export NODE_ENV=production
RUN npm install
RUN npm install pm2 -g

EXPOSE 3100

HEALTHCHECK CMD curl --fail http://localhost:3100/status || exit 1

# Run using PM2 process manager in clustered mode with monitoring
CMD pm2 start app/bin/www -i 0 --name apvs-external-web && pm2 monit