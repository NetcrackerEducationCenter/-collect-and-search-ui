# Берем в качестве родительского образа node:8-apline и назовем эту ступень сборки "build-stage"
FROM node:alpine as build-stage
# Устанавливаем рабочую директорию
WORKDIR /app
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