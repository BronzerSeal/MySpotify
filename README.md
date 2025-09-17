# 🎵 MySpotify

Клон Spotify на **React + TypeScript + Vite** (фронтенд) и **Node.js + Express** (бэкенд).  
Проект создан для практики fullstack-разработки и демонстрации архитектуры.

---

## 🚀 Функциональность

- 🎧 Просмотр популярных альбомов, артистов и треков
- 🔎 Поиск по артистам, альбомам и трекам
- ▶️ Встроенный аудиоплеер (play/pause, перемотка, громкость)
- 📱 Адаптивная верстка
- ⚡️ Быстрая работа благодаря React + Vite
- 🛠 REST API на Node.js + Express

---

## 🗂 Структура проекта

MySpotify/
│── client/ # фронтенд (React + TS + Vite)
│ ├── components/ # UI-компоненты (плеер, карточки, кнопки и т.д.)
│ ├── pages/ # страницы (главная, альбом, артист, поиск)
│ ├── services/ # работа с API
│ ├── App.tsx
│ └── main.tsx
│
│── server/ # бэкенд (Node.js + Express)
│ ├── routes/ # роуты (albums, artists, tracks, playlists)
│ ├── utils/ # утилиты (получение токена и т.д.)
│ ├── app.js # точка входа
│ └── config/ # конфиги
│
└── README.md

yaml
Копировать код

---

## ⚙️ Установка и запуск

### 1. Клонирование проекта

```bash
git clone https://github.com/username/MySpotify.git
cd MySpotify
2. Установка зависимостей
bash
Копировать код
# фронтенд
cd client
npm install

# бэкенд
cd ../server
npm install
3. Настройка переменных окружения
Создайте файл .env в папке server/:

ini
Копировать код
PORT=3000
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
А также файл .env в папке client/:

bash
Копировать код
VITE_API_URL=http://localhost:3000/api
4. Запуск проекта
bash
Копировать код
# сервер (из папки server)
npm run start

# клиент (из папки client)
npm run dev
После запуска проект будет доступен по адресу:
👉 Клиент: http://localhost:5173
👉 API: http://localhost:3000/api

🛠 Технологии
Фронтенд:

React 18

TypeScript

Vite

React Router

Бэкенд:

Node.js

Express

Axios (для Spotify API)

dotenv (переменные окружения)

cors, helmet, morgan (middleware)

📸 Скриншоты
(сюда можно вставить пару скринов интерфейса)

📌 Дальнейшие планы
🔐 Авторизация через Spotify OAuth

🎶 Создание и сохранение плейлистов

📊 История прослушивания

🌍 Деплой (Vercel + Render)

👤 Автор
Arthur Beglaryan

to run the project you need to:

1. Create a spotify account and go to spotify web api
2. Create an application in it
3. replace SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET with yours
```
