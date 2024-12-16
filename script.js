document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для элементов портфолио
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.overlay').style.opacity = '1';
            this.querySelector('img').style.filter = 'brightness(70%)';
            this.querySelector('img').style.transform = 'scale(1.1)';
        });

        item.addEventListener('mouseleave', function() {
            this.querySelector('.overlay').style.opacity = '0';
            this.querySelector('img').style.filter = 'brightness(100%)';
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Код для формы обратной связи
    const form = document.getElementById('feedback-form'); // Получаем форму
    const responseText = document.getElementById('response'); // Параграф для ответа сервера

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Отменяем стандартное поведение формы (перезагрузка страницы)
        
        // Получаем данные из формы
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            // Отправляем POST-запрос на сервер
            const res = await fetch('https://afworks-portfolio.onrender.com/feedback', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            // Обрабатываем ответ от сервера
            if (res.ok) {
                responseText.textContent = 'Обратная связь получена!'; // Успешный ответ
                responseText.style.color = 'green'; 
            } else {
                // Если сервер вернул ошибку
                const errorMessage = await res.text(); // Получаем сообщение об ошибке
                responseText.textContent = `Ошибка отправки данных: ${errorMessage}`;
                responseText.style.color = 'red';
            }
        } catch (error) {
            // Обработка сетевых ошибок или исключений
            responseText.textContent = `Ошибка отправки данных: ${error.message}`;
            responseText.style.color = 'red';
        }

        // Очистка формы после отправки
        form.reset();
    });
});
