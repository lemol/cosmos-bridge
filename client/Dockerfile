FROM node:17.6-alpine AS builder

ARG REACT_APP_GRAPHQL_ENDPOINT
ENV NODE_ENV=production

WORKDIR /src

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production

COPY . .

RUN yarn build

FROM pierrezemb/gostatic AS static
COPY --from=builder /src/build/ /srv/http
