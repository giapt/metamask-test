# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 synthetixio/docker-e2e:18.16-ubuntu as base

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

FROM base as test
RUN yarn --frozen-lockfile --prefer-offline --no-audit
RUN npx playwright install
COPY .env ./
COPY . .