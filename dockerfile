FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine AS prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci --only=production
COPY --from=build /usr/src/app/dist ./dist
CMD ["node", "dist/index.js"]