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
        const form = document.getElementById('feedback-form');
        const responseText = document.getElementById('response');
    
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Отменяем стандартное поведение формы (перезагрузка страницы)
    
            // Получаем данные из формы
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
    
            // Сброс состояния полей
            const fields = [document.getElementById('name'), document.getElementById('email'), document.getElementById('message')];
            fields.forEach(field => {
                field.style.borderColor = ''; // Сброс цвета границы
                const errorElement = document.querySelector(`#${field.id}-error`);
                if (errorElement) errorElement.remove(); // Удаление предыдущих сообщений об ошибках
            });
    
            // Валидация полей формы
            let valid = true;
    
            if (name === '') {
                createErrorMessage(document.getElementById('name'), 'Пожалуйста, заполните это поле.');
                valid = false;
            } else if (name.length < 3) {
                createErrorMessage(document.getElementById('name'), 'Имя должно содержать не менее 3 символов.');
                valid = false;
            }
    
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                createErrorMessage(document.getElementById('email'), 'Пожалуйста, заполните это поле.');
                valid = false;
            } else if (!emailRegex.test(email)) {
                createErrorMessage(document.getElementById('email'), 'Пожалуйста, введите корректный email.');
                valid = false;
            }
    
            if (message === '') {
                createErrorMessage(document.getElementById('message'), 'Пожалуйста, заполните это поле.');
                valid = false;
            } else if (message.length < 10) {
                createErrorMessage(document.getElementById('message'), 'Сообщение должно содержать не менее 10 символов.');
                valid = false;
            }
    
            if (!valid) {
                responseText.textContent = 'Исправьте ошибки перед отправкой.';
                responseText.style.color = 'red';
                return;
            }
    
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
    
        function createErrorMessage(element, message) {
            const errorMessage = document.createElement('div');
            errorMessage.id = `${element.id}-error`;
            errorMessage.className = 'error-message';
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '12px';
            errorMessage.style.marginTop = '5px';
            errorMessage.textContent = message;
            element.style.borderColor = 'red';
            element.insertAdjacentElement('afterend', errorMessage);
        }
    });    
});
