### STAGE 1: Build ###
FROM node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
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