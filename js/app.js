(() => {
    'use strict';

    const menu = document.querySelector('.menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    if (!menu || !menuToggle || !navList) return;

    const setMenuState = (isOpen) => {
        menu.classList.toggle('menu-open', isOpen);
        document.body.classList.toggle('menu-is-open', isOpen && mobileQuery.matches);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    };

    const closeMenu = () => setMenuState(false);

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        setMenuState(!isOpen);
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            menuToggle.focus();
        }
    });

    mobileQuery.addEventListener('change', (event) => {
        if (!event.matches) closeMenu();
    });

    // GSAP enhancements are optional: the layout remains usable if CDN scripts fail.
    const cards = window.gsap && document.querySelector('.card-container');
    if (cards && window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        const cardElements = gsap.utils.toArray('.card-container > [class^="card-"]');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion && mobileQuery.matches && cardElements.length > 1) {
            cardElements.forEach((card, index) => {
                if (index === cardElements.length - 1) return;
                gsap.to(card, {
                    scale: 0.94,
                    y: -12,
                    transformOrigin: 'top center',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: cardElements[index + 1],
                        start: 'top 78%',
                        end: 'top 25%',
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                });
            });
        }

        if (!prefersReducedMotion) {
            gsap.from('.text-servicos-container > *', {
                y: 28,
                opacity: 0,
                duration: 0.65,
                stagger: 0.12,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.text-servicos-container',
                    start: 'top 85%',
                    once: true
                }
            });
            gsap.from('.text-sobre-container > *', {
                y: 24,
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.text-sobre-container',
                    start: 'top 85%',
                    once: true
                }
            });
        }
    }
})();
