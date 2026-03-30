# ---------- Build stage ----------
FROM node:22-alpine AS builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm ci --silent

COPY . .
RUN npm run build

# ---------- Production stage ----------
FROM node:22-alpine AS runner
WORKDIR /app

RUN npm install -g serve --silent

COPY --from=builder /app/dist ./dist

EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
