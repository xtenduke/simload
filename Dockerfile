FROM node:14.15.4 AS install
WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
COPY . .
RUN yarn install
RUN yarn build

ENV NODE_ENV=production
FROM node:14.15.4 as run
WORKDIR /app

COPY --from=install ./app/dist ./dist
COPY ["package.json", "yarn.lock", "./"]
COPY ["messages.txt", "./"]
RUN yarn install
EXPOSE 3000
CMD [ "yarn", "start" ]
