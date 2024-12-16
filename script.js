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
                this.querySelector('img').classList.add('hovered');
            });
    
            item.addEventListener('mouseleave', function() {
                this.querySelector('.overlay').style.opacity = '0';
                this.querySelector('img').classList.remove('hovered');
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
    
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
            // Имя: проверка на пустоту и длину
            if (name === '') {
                createErrorMessage(document.getElementById('name'), 'Это поле обязательно для заполнения.');
                valid = false;
            } else if (name.length < 3) {
                createErrorMessage(document.getElementById('name'), 'Имя должно содержать хотя бы 3 символа.');
                valid = false;
            }
    
            // Email: проверка на пустоту и формат
            if (email === '') {
                createErrorMessage(document.getElementById('email'), 'Введите свой email.');
                valid = false;
            } else if (!emailRegex.test(email)) {
                createErrorMessage(document.getElementById('email'), 'Пожалуйста, введите корректный email.');
                valid = false;
            }
    
            // Сообщение: проверка на пустоту и длину
            if (message === '') {
                createErrorMessage(document.getElementById('message'), 'Сообщение не может быть пустым.');
                valid = false;
            } else if (message.length < 10) {
                createErrorMessage(document.getElementById('message'), 'Сообщение должно содержать хотя бы 10 символов.');
                valid = false;
            }
    
            // Если данные не валидны, прекращаем отправку
            if (!valid) {
                responseText.textContent = 'Исправьте ошибки и попробуйте снова.';
                responseText.style.color = 'red';
                return;
            }
    
            try {
                // Отправка данных на сервер с улучшенной обработкой ошибок
                const res = await fetch('https://afworks-portfolio.onrender.com/feedback', { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message }),
                });
    
                // Ответ от сервера
                if (res.ok) {
                    responseText.textContent = 'Обратная связь успешно отправлена!';
                    responseText.style.color = 'green'; 
                } else {
                    const errorMessage = await res.json();
                    responseText.textContent = `Ошибка: ${errorMessage.message || 'Неизвестная ошибка'}`;
                    responseText.style.color = 'red';
                }
            } catch (error) {
                responseText.textContent = `Ошибка отправки данных: ${error.message}`;
                responseText.style.color = 'red';
            }
    
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
