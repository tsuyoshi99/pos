FROM node:16-alpine AS builder

RUN yarn set version berry

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY .yarn ./.yarn
COPY app/core/package.json ./app/core/package.json
COPY app/ui/package.json ./app/ui/package.json

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY app/core/ ./app/core/
COPY app/ui/ ./app/ui/


RUN yarn workspace ui build

#---
FROM node:16-alpine AS runner

RUN yarn set version berry

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

ENV NODE_ENV=production

COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/.pnp.loader.mjs ./.pnp.loader.mjs
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarn ./.yarn

COPY --from=builder /app/app/ui/ ./app/ui/

COPY --from=builder /app/app/core/ ./app/core/

RUN ls -a
RUN ls -a /app/app

EXPOSE 3000

ENV PORT 3000

CMD ["yarn","workspace","ui","start"]