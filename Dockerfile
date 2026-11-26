# syntax=docker/dockerfile:1

# ---- 1. Build the React client --------------------------------------------
FROM node:22-slim AS client-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY vite.config.js ./
COPY src/client ./src/client
RUN npm run build

# ---- 2. Install production dependencies only -------------------------------
# Build tools are here in case better-sqlite3 has to compile from source;
# they do not end up in the final image.
FROM node:22-slim AS prod-deps
WORKDIR /app
RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ \
 && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- 3. Runtime image ------------------------------------------------------
FROM node:22-slim
ENV NODE_ENV=production \
    PORT=3000 \
    DB_PATH=/app/data/app.db
WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY src/server ./src/server
COPY src/domain ./src/domain
COPY --from=client-build /app/dist ./dist

RUN mkdir -p /app/data && chown -R node:node /app/data
USER node
VOLUME ["/app/data"]

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD node -e "fetch('http://localhost:'+(process.env.PORT||3000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["npm", "start"]
