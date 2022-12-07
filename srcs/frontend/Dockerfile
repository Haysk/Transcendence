FROM node:19-alpine

RUN npm install -g npm
RUN npm install -gS @angular/cli@latest

# Create app directory
WORKDIR /usr/src/app

CMD npm install && npm run start
