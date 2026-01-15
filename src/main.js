document.addEventListener('DOMContentLoaded', () => {
    // Инициализация иконок Lucide
    lucide.createIcons();

    // Скролл-эффект для хедера
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });

    // Бургер-меню (простая реализация для старта)
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');

    burger.addEventListener('click', () => {
        // Здесь можно добавить логику открытия мобильного меню
        console.log('Mobile menu toggle');
    });
    // Добавьте это внутрь DOMContentLoaded
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;
        
        const circles = document.querySelectorAll('.hero__circle');
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.5;
            circle.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });
    }
    // Внутри DOMContentLoaded
const observerOptions = {
    threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Если нужно, чтобы анимация сработала только один раз:
            // revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});
    // Добавьте это в DOMContentLoaded
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.target;

        // Удаляем активные классы
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Добавляем активный класс нажатой кнопке и соответствующей панели
        btn.classList.add('active');
        document.getElementById(target).classList.add('active');
        
        // Переинициализация иконок, если они есть в новых панелях
        lucide.createIcons();
    });
});
});