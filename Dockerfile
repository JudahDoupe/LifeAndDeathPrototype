FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.js ./
RUN npm install

COPY src ./src
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
