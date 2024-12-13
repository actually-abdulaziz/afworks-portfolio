const express = require('express');
const path = require('path');
const cors = require('cors');  // Добавление CORS
const app = express();

// Используем порт из переменной окружения, если он существует, или 3000 по умолчанию
const PORT = process.env.PORT || 3000;

// Разрешаем CORS
app.use(cors());

// Позволяет обрабатывать JSON из запроса
app.use(express.json());

// Обработка формы обратной связи
app.post('/feedback', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Имя: ${name}, Email: ${email}, Сообщение: ${message}`);
    res.status(200).send('Обратная связь получена!');
});

// Настройка для обслуживания статических файлов из текущей папки
app.use(express.static(path.join(__dirname)));

// Обработка главной страницы (для GET-запросов на /)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Убедитесь, что index.html находится в той же папке, что и server.js
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
