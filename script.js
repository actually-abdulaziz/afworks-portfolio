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
        e.preventDefault(); 
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
    
        // Простая валидация
        if (!name || !email || !message) {
            responseText.textContent = 'Пожалуйста, заполните все поля.';
            responseText.style.color = 'red';
            return;
        }
    
        // Проверка формата email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            responseText.textContent = 'Введите корректный email.';
            responseText.style.color = 'red';
            return;
        }
    
        // Далее — отправка запроса
        try {
            const res = await fetch('https://afworks-portfolio.onrender.com/feedback', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });
    
            if (res.ok) {
                responseText.textContent = 'Обратная связь получена!';
                responseText.style.color = 'green';
            } else {
                const errorMessage = await res.text();
                responseText.textContent = `Ошибка отправки данных: ${errorMessage}`;
                responseText.style.color = 'red';
            }
        } catch (error) {
            responseText.textContent = `Ошибка сети: ${error.message}`;
            responseText.style.color = 'red';
        }
    
        form.reset();
    });
});
