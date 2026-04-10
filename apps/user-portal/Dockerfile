FROM node:22-alpine AS builder
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

COPY package*.json turbo.json ./
COPY apps/admin-portal/package.json apps/admin-portal/package.json
COPY apps/user-portal/package.json apps/user-portal/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/tsconfig/package.json packages/tsconfig/package.json

RUN npm ci --silent

COPY . .
RUN npm run build -- --filter=user-portal

FROM node:22-alpine AS runner
WORKDIR /app

RUN npm install -g serve --silent

COPY --from=builder /app/apps/user-portal/dist ./dist

EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
