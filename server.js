const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Позволяет обрабатывать JSON из запроса
app.use(express.json());

// Обработка формы обратной связи
app.post('/feedback', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Имя: ${name}, Email: ${email}, Сообщение: ${message}`);
    res.status(200).send('Обратная связь получена!');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
