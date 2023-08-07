# stage-0
FROM node:14 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
COPY .env /app/.env
RUN npm run build

# stage-1
FROM nginx:1.19-alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
