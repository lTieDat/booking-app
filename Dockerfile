# ---------- Build stage ----------
FROM node:18-alpine AS builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies (use package-lock.json if present)
COPY package*.json ./
# Use npm ci when a lockfile exists, otherwise fallback to npm install
RUN sh -c "if [ -f package-lock.json ]; then npm ci --silent; else npm install --silent; fi"

# Copy sources and build
COPY . .
RUN npm run build

# ---------- Production stage (Node static server) ----------
FROM node:18-alpine AS runner
WORKDIR /app

# Install a small static server globally (serve) to host the built assets
# We install during image build so runtime doesn't need network access
RUN npm install -g serve --silent

# Copy build artifacts from builder
COPY --from=builder /app/build ./build

EXPOSE 80
# Serve the SPA with fallback routing (-s) on port 80
CMD ["serve", "-s", "build", "-l", "80"]
