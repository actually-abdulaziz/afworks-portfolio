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
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('feedback-form');
        const responseText = document.getElementById('response');
    
        // Функция для очистки от XSS (экранирование спецсимволов)
        function escapeHTML(str) {
            return str.replace(/[&<>"']/g, (match) => {
                const escapeMap = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;',
                };
                return escapeMap[match];
            });
        }
    
        // Функция для валидации email
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    
        // Функция для валидации данных
        function validateFormData(name, email, message) {
            const errors = [];
    
            if (!name || name.length < 2 || name.length > 50) {
                errors.push('Имя должно содержать от 2 до 50 символов.');
            }
    
            if (!email || !isValidEmail(email)) {
                errors.push('Введите корректный email-адрес.');
            }
    
            if (!message || message.length < 10 || message.length > 500) {
                errors.push('Сообщение должно содержать от 10 до 500 символов.');
            }
    
            return errors;
        }
    
        // Обработчик отправки формы
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
    
            // Получаем и очищаем ввод
            const name = escapeHTML(document.getElementById('name').value.trim());
            const email = escapeHTML(document.getElementById('email').value.trim());
            const message = escapeHTML(document.getElementById('message').value.trim());
    
            // Валидируем данные
            const errors = validateFormData(name, email, message);
    
            if (errors.length > 0) {
                responseText.textContent = errors.join(' ');
                responseText.style.color = 'red';
                return;
            }
    
            // Если валидация пройдена — отправляем данные на сервер
            try {
                const res = await fetch('/feedback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message }),
                });
    
                if (res.ok) {
                    responseText.textContent = 'Ваше сообщение успешно отправлено!';
                    responseText.style.color = 'green';
                } else {
                    const errorMessage = await res.text();
                    responseText.textContent = `Ошибка сервера: ${errorMessage}`;
                    responseText.style.color = 'red';
                }
            } catch (error) {
                responseText.textContent = `Ошибка сети: ${error.message}`;
                responseText.style.color = 'red';
            }
    
            // Очистка формы
            form.reset();
        });
    });
    
});
