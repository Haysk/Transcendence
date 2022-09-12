FROM node:18-alpine

RUN npm install -g npm
RUN npm install -g @angular/cli

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json /usr/src/app/

# Install app dependencies
RUN npm install

# Creates a "dist" folder with the production build
# RUN npm run build

CMD npm run start