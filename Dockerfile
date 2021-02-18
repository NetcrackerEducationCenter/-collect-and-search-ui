# Берем в качестве родительского образа node:8-apline и назовем эту ступень сборки "build-stage"
FROM node:8-alpine as build-stage
# Устанавливаем рабочую директорию
WORKDIR /usr/src/app
# Копируем файлы package.json yarn.lock в рабочую директорию
COPY package*.json ./
# Устаналиваем зависимости
RUN npm install
# Копируем исходники в рабочую директорию
COPY . ./
# Собираем проект
RUN npm run build

# Открываем 8080 порт
EXPOSE 8080
# Указываем команду, поднимающую nginx при запуске контейнера
CMD ["npm", "start"]