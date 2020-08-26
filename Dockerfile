FROM node:12.18.0-alpine3.9 as build
WORKDIR /temp
COPY package.json ./
RUN npm i
COPY src ./src
COPY public ./public
RUN npm run build
RUN ls
FROM nginx:mainline-alpine-perl as runner
WORKDIR /app
COPY --from=build /temp/build ./
COPY ./default.nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
