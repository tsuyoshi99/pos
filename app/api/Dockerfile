FROM node:16-alpine

WORKDIR /app

COPY app/core/package.json /app/app/core/package.json
COPY app/api/package.json /app/app/api/package.json

COPY package.json .
COPY yarn.lock .

RUN yarn --pure-lockfile --non-interactive --production

COPY app/core/ /app/app/core/
COPY app/api/ /app/app/api/

CMD ["yarn", "workspace", "api", "start"]