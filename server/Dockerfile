# ==========================================
# ЭТАП 1: Сборка (Builder)
# ==========================================
FROM node:22-alpine AS builder
WORKDIR /app

# Устанавливаем OpenSSL для корректной работы Prisma
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci

COPY . .

# Генерируем Prisma Client для этапа сборки (для типов TypeScript)
RUN npx prisma generate

# Собираем TypeScript в JavaScript (папка dist)
RUN npm run build

# ==========================================
# ЭТАП 2: Продакшн (Production)
# ==========================================
FROM node:22-alpine
WORKDIR /app

# 1. Устанавливаем OpenSSL для Prisma в финальном образе
RUN apk add --no-cache openssl

# 2. Создаем непривилегированного пользователя для безопасности
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# 3. Копируем package.json и устанавливаем ТОЛЬКО production-зависимости (выполняется от root)
COPY package*.json ./
RUN npm ci --omit=dev

# 4. Копируем скомпилированный код и схему Prisma из этапа сборки
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/prisma ./prisma

# 5. ГЕНЕРИРУЕМ PRISMA ОТ ИМЕНИ ROOT (у root есть права на запись в node_modules)
RUN npx prisma generate

# 6. ПЕРЕДАЕМ ПРАВА на всю папку /app пользователю nodejs для безопасного запуска
RUN chown -R nodejs:nodejs /app

# 7. Переключаемся на непривилегированного пользователя
USER nodejs

# Переменные окружения
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# ЗАПУСК: Убедитесь, что путь к файлу совпадает с вашим! 
# (обычно это dist/index.js или dist/main.js - проверьте ваш server/package.json в секции "scripts" -> "start")
CMD ["node", "dist/index.js"]