FROM node:14.15-alpine

ENV PORT 80
ARG DATABASE_URL=${DATABASE_URL}
ENV DATABASE_URL=${DATABASE_URL}

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm i -g pnpm
RUN pnpm install

# Copying source files
COPY . /usr/src/app

# Building app
RUN npx prisma migrate deploy
RUN npx prisma generate
RUN pnpm run build
EXPOSE 80

# Running the app
CMD "npm" "start"