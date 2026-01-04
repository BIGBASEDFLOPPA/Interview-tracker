Interview Tracker Pro - Backend

Backend для проекта Interview Tracker Pro на Node.js + Express + PostgreSQL + Prisma + Docker + zod.

Подготовка к запуску

Перейдите в папку backend:
cd backend

Создайте файл .env с переменными
Пример - 
PORT=4000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your secret key here"
COMPOSE_PROJECT_NAME=project-name
POSTGRES_USER=username_here
POSTGRES_PASSWORD=password_here
POSTGRES_DB=postgress_db_here

Установите зависимости:
npm install

старт
docker compose up -d --build создать новый контейнер
docker compose exec backend npx prisma migrate dev --name init миграции призмы
docker compose exec backend npx prisma generate Генерация Prisma Client
docker compose exec backend npx prisma studio  если нужно открыть клиент призмы(внутри контейнера)

Сервер доступен по адресу: http://localhost:4000



