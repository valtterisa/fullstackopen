FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@10.25.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json frontend/
COPY backend/package.json backend/

RUN pnpm install --frozen-lockfile

COPY frontend frontend
COPY backend backend

RUN pnpm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start"]
