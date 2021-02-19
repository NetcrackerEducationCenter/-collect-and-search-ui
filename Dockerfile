# FROM node:13.1-alpine as build

# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN yarn cache clean && yarn --update-checksums
# COPY . ./
# RUN yarn && yarn build

# # Stage - Production
# FROM nginx:1.17-alpine
# COPY --from=build /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]