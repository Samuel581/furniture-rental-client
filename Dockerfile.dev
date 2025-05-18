# Base image
FROM node:24-alpine

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Install dependencies early for caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy everything else (optional when using bind mounts)
COPY . .

# Expose the dev port
EXPOSE 3000

# Default command
CMD ["pnpm", "dev"]
