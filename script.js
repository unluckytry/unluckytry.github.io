class MobileSupport {
    constructor() {
        this.initNav();
        this.initTiltEffects();
        this.initRipple();
        this.initKeyboard();
    }

    initNav() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger) {
            const navContainer = document.querySelector('.nav-container');
            const ham = document.createElement('div');
            ham.className = 'hamburger';
            ham.innerHTML = '<span></span><span></span><span></span>';
            navContainer.appendChild(ham);
        }

        document.querySelector('.hamburger').addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    initTiltEffects() {
        let isTouchDevice = 'ontouchstart' in window;

        const handler = (e) => {
            const cards = document.querySelectorAll('.card, .photo-frame');
            let clientX, clientY;

            if (isTouchDevice && e.touches) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            const x = clientX / window.innerWidth;
            const y = clientY / window.innerHeight;
            
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const rotateX = (y - 0.5) * 10;
                const rotateY = (0.5 - x) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
            });
        };

        document.addEventListener('mousemove', handler);
        document.addEventListener('touchmove', handler, { passive: true });
        
        document.addEventListener('touchstart', (e) => {
            const target = e.target.closest('.card, .photo-frame');
            if (target) target.classList.add('touched');
        }, { passive: true });
        
        document.addEventListener('touchend', () => {
            document.querySelectorAll('.card, .photo-frame').forEach(card => {
                card.classList.remove('touched');
            });
        }, { passive: true });
    }

    initRipple() {
        document.addEventListener('click', (e) => this.createRipple(e.clientX, e.clientY));
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.createRipple(touch.clientX, touch.clientY);
        }, { passive: true });
    }

    createRipple(x, y) {
        const ripple = document.getElementById('ripple') || this.createRippleElement();
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '60px';
        ripple.style.height = '60px';
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '1';
        
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(4)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            ripple.style.width = '0';
            ripple.style.height = '0';
        };
    }

    createRippleElement() {
        const ripple = document.createElement('div');
        ripple.id = 'ripple';
        ripple.className = 'ripple-effect';
        document.body.appendChild(ripple);
        return ripple;
    }

    initKeyboard() {
        document.addEventListener('keydown', (e) => {
            const navbar = document.querySelector('.navbar');
            switch(e.code) {
                case 'ArrowUp':
                    navbar.style.transform = 'translateX(-50%) translateY(-10px) scale(1.05)';
                    setTimeout(() => navbar.style.transform = 'translateX(-50%)', 300);
                    break;
                case 'ArrowDown':
                    navbar.style.transform = 'translateX(-50%) translateY(10px)';
                    setTimeout(() => navbar.style.transform = 'translateX(-50%)', 300);
                    break;
                case 'KeyA':
                    document.body.style.filter = 'drop-shadow(0 0 30px rgba(255,255,255,0.5))';
                    setTimeout(() => document.body.style.filter = '', 500);
                    break;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MobileSupport();
});
