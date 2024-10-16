# Use Node.js 18 as the base image
FROM node:18

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

ENV PORT=8080
EXPOSE 8080

# Specify the command to run your application
CMD ["yarn", "start"]