$(document).ready(function () {
    AOS.init();
    $('.slick-slider-multi').slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: false,
        autoplay: true,
        speed: 1500,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 567,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
        ]
    })

    const input = document.querySelector("#phone");
    if (input) {
        intlTelInput(input);
    }

    $('.block').matchHeight();

    if ($('.counter-value').length) {
        $('.counter-value').each(function () {

            $(this).counterUp({
                delay: 10,
                time: 1000
            });


        });
    }
});

// THEMING
document.addEventListener('DOMContentLoaded', function () {
    const bodyElement = document.body;

    // Set dark theme as the default or retrieve the saved theme
    const storedTheme = localStorage.getItem('theme') || 'dark';
    bodyElement.setAttribute('data-theme', storedTheme);

    const switchElement = document.getElementById('switchTheme');
    if (switchElement) {
        const labelElement = switchElement.nextElementSibling;
        switchElement.checked = storedTheme === 'dark';
        labelElement.textContent = storedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

        // Toggle theme and update label text
        switchElement.addEventListener('change', function () {
            const isDark = bodyElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            bodyElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            labelElement.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector('.homepage .navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    } else {
        console.log("Navbar element not found.");
    }
});

window.onload = function () {
    function isMobile() {
        return window.innerWidth <= 992;
    }

    function updateAOSForMobile() {
        if (isMobile()) {
            const fadeRightElements = document.querySelectorAll('[data-aos="fade-right"]');
            const fadeLeftElements = document.querySelectorAll('[data-aos="fade-left"]');

            fadeRightElements.forEach(element => {
                element.setAttribute('data-aos', 'fade-up');
            });
            fadeLeftElements.forEach(element => {
                element.setAttribute('data-aos', 'fade-up');
            });

            AOS.refresh();
        }
    }

    updateAOSForMobile();
    window.addEventListener('resize', updateAOSForMobile);
};

document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.timeline-section');
    const progress = document.querySelector('.timeline-progress');
    const circles = Array.from(document.querySelectorAll('.timeline-circle'));
    if (!section || !progress || circles.length === 0) return;

    // start state
    circles.forEach(c => c.classList.remove('active'));
    progress.style.height = '0%';

    let ticking = false;
    const threshold = 20; // px before the circle center at which it becomes active (tune this)

    function update() {
        const sectionRect = section.getBoundingClientRect();
        const windowH = window.innerHeight;

        // how far we've progressed through the section (0..1)
        // we add windowH so that start is when top of section hits bottom of viewport
        const scrollTop = windowH - sectionRect.top;
        const sectionSpan = sectionRect.height + windowH;
        const scrollPercent = Math.min(Math.max(scrollTop / sectionSpan, 0), 1);

        // progressHeight in px relative to section top
        const progressHeight = scrollPercent * sectionRect.height;
        progress.style.height = (scrollPercent * 100) + '%';

        // activate circles when progress reaches the circle's center relative to the section
        circles.forEach(circle => {
            const circleRect = circle.getBoundingClientRect();
            const circleCenterRelativeToSection = (circleRect.top - sectionRect.top) + (circleRect.height / 2);

            if (progressHeight + threshold >= circleCenterRelativeToSection) {
                circle.classList.add('active');
            } else {
                circle.classList.remove('active');
            }
        });

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    // run initially and on events
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
        // recalc geometry immediately on resize
        update();
    });
});
