# BUILD
FROM node:20-bullseye AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# PRODUCTION
FROM node:20-bullseye

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .env

EXPOSE 3001

CMD ["node", "dist/main.js"]