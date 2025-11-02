$(document).ready(function () {
    AOS.init();
    $('.slick-slider-multi').slick({
        rtl: true,
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
});

// Theme
document.addEventListener('DOMContentLoaded', function () {
    const bodyElement = document.body;

    // Set dark theme as the default or retrieve the saved theme
    const storedTheme = localStorage.getItem('theme') || 'dark';
    bodyElement.setAttribute('data-theme', storedTheme);

    const switchElement = document.getElementById('switchTheme');
    if (switchElement) {
        const labelElement = switchElement.nextElementSibling;
        switchElement.checked = storedTheme === 'dark';
        labelElement.textContent = storedTheme === 'dark' ? 'الوضع المضىء' : 'الوضع الليلى';

        // Toggle theme and update label text
        switchElement.addEventListener('change', function () {
            const isDark = bodyElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            bodyElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            labelElement.textContent = newTheme === 'dark' ? 'الوضع المضىء' : 'الوضع الليلى';
            updateCharts(); // Assuming this function updates your charts
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

