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

### STAGE 1: Build ###
FROM node:alpine as build
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app
RUN npm install --legacy-peer-deps
# RUN npm install react-scripts -g 
COPY . /app
RUN npm run build

### STAGE 2: Production Environment ###
FROM nginx:1.13.12-alpine
COPY --from=build /app/build /app/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]