FROM node:17.6-alpine

ENV NODE_ENV=production PORT=80

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production && mv node_modules ../

COPY . .
EXPOSE 80
RUN chown -R node /usr/src/app
USER node
CMD ["node", "--experimental-fetch", "index.js"]
