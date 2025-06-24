# x-æ13r4space

**x-æ13r4space** is a full-stack web application that brings the wonders of space science, astronomy, and exploration to your fingertips. Discover NASA’s Astronomy Picture of the Day, explore SpaceX missions, learn about NASA astronauts, chat with others, and stay updated on skywatching events—all in one interactive platform.

Demo: **http://xa13r4space.me/**
---

## 🚀 Key Features

- **Interactive Science Dashboard:**  
  Visually engaging cards for APOD, SpaceX Missions, NASA Astronauts, and Skywatching.
- **Live Data:**  
  Fetches real-time information from NASA and SpaceX APIs.
- **Chat System:**  
  Powered by Laravel Filament Chat for real-time conversations and community engagement.
- **Responsive Design:**  
  Works seamlessly on desktop and mobile devices.
- **Full-Stack:**  
  React frontend and Laravel backend for robust performance.

---

## 🖼️ Preview

https://github.com/user-attachments/assets/79e972ca-9618-4837-bebf-1b56996a3042



---

## 🛠️ Project Structure

```
x-æ13r4space/
│
├── backend/                # Laravel + Filament Chat
│   ├── app/
│   ├── routes/
│   ├── ... (folders)
│   ├── composer.json
│   └── ...
│
├── frontend/               # React
│   ├── src/
│   │   ├── components/
│   │   │   └── Science.jsx
│   │   ├── image/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PHP](https://www.php.net/) (8.1+ recommended)
- [Composer](https://getcomposer.org/)
- [MySQL](https://www.mysql.com/) or another supported database

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/x-ae13r4space.git
cd x-ae13r4space
```

### 2. Setup Backend (Laravel + Filament Chat)

```sh
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configure your .env database settings
php artisan migrate
php artisan filament:install
php artisan filament-chat:install
php artisan serve
```
- The backend runs on [http://localhost:8000](http://localhost:8000) by default.

### 3. Setup Frontend (React)

Open a new terminal:

```sh
cd frontend
npm install
npm start
```
- The frontend runs on [http://localhost:3000](http://localhost:3000).

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.
nann.sannaa@gmail.com 

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

*Made with ❤️ for space enthusiasts.*
