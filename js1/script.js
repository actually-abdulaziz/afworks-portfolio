document.addEventListener('DOMContentLoaded', function() {
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
    const form = document.querySelector('.contact-form form');  // Получаем форму
    const responseText = document.createElement('p');  // Создаем элемент для вывода ответа
    form.appendChild(responseText);  // Добавляем элемент на страницу

    form.addEventListener('submit', async (e) => {
        e.preventDefault();  // Отменяем стандартное поведение формы (перезагрузка страницы)
        
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;

        try {
            const res = await fetch('https://afworks-portfolio.onrender.com', {  // Замените на ваш серверный адрес
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            const text = await res.text();
            responseText.textContent = text;  // Выводим ответ от сервера
        } catch (error) {
            responseText.textContent = 'Ошибка отправки данных!';  // Если произошла ошибка
        }
    });
});
