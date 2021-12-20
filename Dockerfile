FROM node:14.15-alpine

ENV PORT 80

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm i -g pnpm
RUN pnpm install

# Copying source files
COPY . /usr/src/app

ARG DATABASE_URL=${DATABASE_URL}
ARG NEXT_PUBLIC_HCAPTCHA_SITEKEY=${NEXT_PUBLIC_HCAPTCHA_SITEKEY}

RUN pnpm run pre-start

# Building app
EXPOSE 80

# Running the app
CMD "npm" "start"