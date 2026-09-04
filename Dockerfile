# -------------------------------------------------------------------
# Stage 1: Build TypeScript source
# -------------------------------------------------------------------
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Copy dependency manifests
COPY api/package*.json ./

# Install all dependencies (including devDependencies needed for TypeScript build)
RUN npm ci

# Copy API source and TypeScript configuration
COPY api/ ./

# Build TypeScript source into /app/dist
RUN npm run build

# -------------------------------------------------------------------
# Stage 2: Production runtime (optimized for Render.com)
# -------------------------------------------------------------------
FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install only production dependencies
COPY --chown=node:node api/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled JavaScript from builder
COPY --chown=node:node --from=builder /app/dist ./dist

# Port exposed by default (Render injects PORT dynamically)
EXPOSE 3000

# Run as unprivileged node user
USER node

# Start the compiled Node.js application
CMD ["node", "dist/index.js"]