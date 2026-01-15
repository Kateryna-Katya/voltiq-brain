/**
 * voltiq-brain.fit - Main Script
 * Год: 2026
 * Особенности: No-libraries, Vanilla JS, Intersection Observer
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Инициализация иконок Lucide ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 2. Управление Хедером (скролл-эффект) ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(11, 14, 20, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(11, 14, 20, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // --- 3. Мобильное меню ---
    const burger = document.getElementById('burger-menu');
    const closeBtn = document.getElementById('close-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    const toggleMenu = (state) => {
        if (state === 'open') {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (burger) burger.addEventListener('click', () => toggleMenu('open'));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu('close'));
    
    // Закрытие при клике на ссылку в мобильном меню
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu('close'));
    });

    // --- 4. Hero Parallax (движение за мышью) ---
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 1024) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / 50;
            const moveY = (clientY - centerY) / 50;
            
            const circles = document.querySelectorAll('.hero__circle');
            circles.forEach((circle, index) => {
                const speed = (index + 1) * 0.4;
                circle.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });
        });
    }

    // --- 5. Reveal Animation (появление при скролле) ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // --- 6. Инновации (Переключение Табов) ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;

            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(target);
            if (targetPanel) {
                targetPanel.classList.add('active');
                // Переинициализация иконок внутри таба
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    });

    // --- 7. Контактная форма и Капча ---
    const contactForm = document.getElementById('ai-contact-form');
    const captchaLabel = document.getElementById('captcha-question');
    const phoneInput = document.getElementById('user-phone');
    const successBox = document.getElementById('form-success');

    let num1, num2, correctAnswer;

    const generateCaptcha = () => {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 + num2;
        if (captchaLabel) captchaLabel.textContent = `${num1} + ${num2}`;
    };

    if (captchaLabel) generateCaptcha();

    // Валидация телефона в реальном времени
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userAnswer = parseInt(document.getElementById('captcha-answer').value);
            
            if (userAnswer !== correctAnswer) {
                alert('Ошибка проверки! Пожалуйста, решите математический пример правильно.');
                generateCaptcha();
                return;
            }

            const submitBtn = contactForm.querySelector('.form__submit');
            const originalText = submitBtn.innerHTML;
            
            // Эффект загрузки
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Обработка данных...</span>';

            // Имитация AJAX-запроса
            setTimeout(() => {
                successBox.classList.add('active');
                contactForm.reset();
                generateCaptcha();
                
                // Возврат кнопки через время
                setTimeout(() => {
                    successBox.classList.remove('active');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 5000);
            }, 1500);
        });
    }

    // --- 8. Cookie Popup ---
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptCookies = document.getElementById('accept-cookies');

    if (cookiePopup && acceptCookies) {
        const isAccepted = localStorage.getItem('cookies-accepted');
        
        if (!isAccepted) {
            setTimeout(() => {
                cookiePopup.classList.add('visible');
            }, 3000);
        }

        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookies-accepted', 'true');
            cookiePopup.classList.remove('visible');
        });
    }
    
    // --- 9. Плавный скролл для всех якорных ссылок ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});