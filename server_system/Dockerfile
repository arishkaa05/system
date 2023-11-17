# FROM node:18.17.1
# WORKDIR /
# COPY /src /src
# COPY ./package.json .
# RUN npm install
# EXPOSE 8081
# CMD ["npm","start"]
FROM node:18.17.1

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8081

CMD [ "npm", "start" ]