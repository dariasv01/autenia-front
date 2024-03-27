# Stage 1
FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:latest
COPY --from=build /app/dist/autenia-front/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
