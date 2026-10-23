# ==========================================
# ЭТАП 1: Сборка приложения
# ==========================================
FROM node:22-alpine AS builder
WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY package*.json ./
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение (создаст папку .output с серверным бандлом)
RUN npm run build

# ==========================================
# ЭТАП 2: Запуск (Node.js, а НЕ Nginx!)
# ==========================================
FROM node:22-alpine
WORKDIR /app

# Копируем собранное приложение из этапа builder
COPY --from=builder /app/.output ./.output

# Копируем файлы зависимостей для установки production-пакетов
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Устанавливаем только production-зависимости
RUN npm ci --omit=dev

# Переменные окружения для TanStack Start
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# СБРАСЫВАЕМ entrypoint по умолчанию (чтобы не запускался скрипт node или nginx)
ENTRYPOINT []

# Явно запускаем скомпилированный серверный файл
CMD ["node", ".output/server/index.mjs"]