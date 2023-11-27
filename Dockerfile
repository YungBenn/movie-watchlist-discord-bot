# Build stage
FROM oven/bun:1.0-alpine AS builder
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

# Production stage
FROM alpine:3.18.4
WORKDIR /app
COPY --from=builder /app/dist/index.js /app
COPY --from=builder /app/.env /app
ENV NODE_ENV=production
CMD [ "bun", "run", "index.js" ]
