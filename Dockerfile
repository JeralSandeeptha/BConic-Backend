# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build


# Stage 2: Run with PM2
FROM node:20-alpine AS runner

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy package.json for runtime dependencies
COPY package*.json ./

RUN npm install --only=production

# Copy build output
COPY --from=builder /app/dist ./dist

# Copy ecosystem config (we’ll create this file next)
COPY ecosystem.config.js ./

EXPOSE 5000

# Start the app with PM2 in "fork mode"
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
