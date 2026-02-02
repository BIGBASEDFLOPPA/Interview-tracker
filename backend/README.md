### Backend для проекта Interview Tracker на Node.js + Express + PostgreSQL + Prisma + Docker + zod.

#### Подготовка к запуску
1) Перейдите в папку backend:cd backend
2) Создайте файл .env с переменными
Пример - 
```javascript
PORT=4000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your secret key here"
COMPOSE_PROJECT_NAME=project-name
POSTGRES_USER=username_here
POSTGRES_PASSWORD=password_here
POSTGRES_DB=postgress_db_here
```
3) Установите зависимости:npm install

#### Запуск в докере
1) docker compose up -d --build создать новый контейнер
2) docker compose exec backend npx prisma migrate dev --name init миграции призмы
3) docker compose exec backend npx prisma generate Генерация Prisma Client

#### Открыть клиент призмы(внутри контейнера)
1) docker compose exec backend npx prisma studio

Сервер доступен по адресу: http://localhost:4000



