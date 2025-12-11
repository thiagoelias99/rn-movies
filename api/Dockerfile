# -------------------------
# STAGE 1 — DEPENDENCIES
# -------------------------
FROM node:20-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install


# -------------------------
# STAGE 2 — BUILDER
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Compila o projeto
RUN npm run build


# -------------------------
# STAGE 3 — RUNNER (PRODUÇÃO)
# -------------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia apenas o build e dependências para produção
COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Comando de execução
CMD ["node", "dist/main.js"]
