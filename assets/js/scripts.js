$(document).ready(function () {
  AOS.init();
  $(".slick-slider-multi").slick({
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
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });


  var $slider1 = $('.course-slick-slider');

  // Initialize Slick
  $slider1.slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    dots: true,
    autoplay: true,
    speed: 1500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Pause slider when video plays
  $('.course-slick-slider video').on('play', function () {
    $slider1.slick('slickPause');
  });

  // Resume slider when video is paused
  $('.course-slick-slider video').on('pause ended', function () {
    $slider1.slick('slickPlay');
  });

  var $slider2 = $('.review-slick-slider');

  // Initialize Slick
  $slider2.slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dots: true,
    autoplay: true,
    speed: 1500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Pause slider when video plays
  $('.review-slick-slider video').on('play', function () {
    $slider2.slick('slickPause');
  });

  // Resume slider when video is paused
  $('.review-slick-slider video').on('pause ended', function () {
    $slider2.slick('slickPlay');
  });

  $(".payment-slick-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    speed: 1500,
  })

  const input = document.querySelector("#phone");
  if (input) {
    intlTelInput(input);
  }

  if ($(".counter-value").length) {
    $(".counter-value").each(function () {
      $(this).counterUp({
        delay: 10,
        time: 1000,
      });
    });
  }

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

  const cards = document.querySelectorAll(".block-custom");
  const container = document.querySelector(".block-cards");

  function setDynamicMinHeight() {
    let maxHeight = 0;
    cards.forEach(card => {
      const cardHeight = card.offsetHeight;
      if (cardHeight > maxHeight) maxHeight = cardHeight;
    });

    // خلي الحد الأدنى على الأقل أكبر كارت أو 70vh
    const minHeight = Math.max(maxHeight, window.innerHeight * 0.7);
    container.style.minHeight = `${minHeight}px`;
  }

  function initCardsAnimation() {
    const time = 0.5;
    let animating = false;

    gsap.set(cards, {
      y: (i) => 20 * i,
      transformOrigin: "center top"
    });

    const tl = gsap.timeline({ paused: true });

    cards.forEach((card, i) => {
      tl.add(`card${i + 1}`);
      tl.to(card, { scale: 0.95 + 0.015 * i, duration: time });

      if (i + 1 < cards.length) {
        tl.from(cards[i + 1], { y: () => window.innerHeight, duration: time }, "<");
      }
    });

    function tweenToLabel(label, isScrollingDown) {
      if ((!tl.nextLabel() && isScrollingDown) || (!tl.previousLabel() && !isScrollingDown)) {
        cardsObserver.disable();
        return;
      }
      if (!animating && label) {
        animating = true;
        tl.tweenTo(label, { onComplete: () => (animating = false) });
      }
    }

    const cardsObserver = Observer.create({
      wheelSpeed: -1,
      onDown: () => tweenToLabel(tl.previousLabel(), false),
      onUp: () => tweenToLabel(tl.nextLabel(), true),
      tolerance: 10,
      preventDefault: true,
      onEnable(self) {
        const savedScroll = self.scrollY();
        self._restoreScroll = () => self.scrollY(savedScroll);
        document.addEventListener("scroll", self._restoreScroll, { passive: false });
      },
      onDisable(self) {
        document.removeEventListener("scroll", self._restoreScroll);
      }
    });

    cardsObserver.disable();

    ScrollTrigger.create({
      trigger: ".block-cards",
      pin: true,
      start: "top-=100 top",
      end: () => `+=${window.innerHeight * (cards.length - 1)}`,
      scrub: true,
      onEnter: () => !cardsObserver.isEnabled && cardsObserver.enable(),
      onEnterBack: () => !cardsObserver.isEnabled && cardsObserver.enable()
    });
  }

  // 🧠 التفعيل فقط على الشاشات >= 992px
  function handleResponsiveAnimation() {
    if (window.innerWidth >= 576) {
      setDynamicMinHeight();
      initCardsAnimation();
    } else {
      // لو الموبايل → ألغِ أي تأثيرات GSAP
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.globalTimeline.clear();
      gsap.killTweensOf("*");

      cards.forEach(card => {
        gsap.set(card, { clearProps: "transform,opacity,y,scale" });
      });
      container.style.minHeight = "auto";
    }
  }

  // أول تشغيل + عند تغيير حجم الشاشة
  window.addEventListener("load", handleResponsiveAnimation);
  window.addEventListener("resize", handleResponsiveAnimation);


});

// THEMING
document.addEventListener("DOMContentLoaded", function () {
  const bodyElement = document.body;

  // Set dark theme as the default or retrieve the saved theme
  const storedTheme = localStorage.getItem("theme") || "dark";
  bodyElement.setAttribute("data-theme", storedTheme);

  const switchElement = document.getElementById("switchTheme");
  if (switchElement) {
    const labelElement = switchElement.nextElementSibling;
    switchElement.checked = storedTheme === "dark";
    labelElement.textContent =
      storedTheme === "dark" ? "Light Mode" : "Dark Mode";

    // Toggle theme and update label text
    switchElement.addEventListener("change", function () {
      const isDark = bodyElement.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      bodyElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      labelElement.textContent =
        newTheme === "dark" ? "Light Mode" : "Dark Mode";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".homepage .navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
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
      const fadeRightElements = document.querySelectorAll(
        '[data-aos="fade-right"]'
      );
      const fadeLeftElements = document.querySelectorAll(
        '[data-aos="fade-left"]'
      );

      fadeRightElements.forEach((element) => {
        element.setAttribute("data-aos", "fade-up");
      });
      fadeLeftElements.forEach((element) => {
        element.setAttribute("data-aos", "fade-up");
      });

      AOS.refresh();
    }
  }

  updateAOSForMobile();
  window.addEventListener("resize", updateAOSForMobile);
};

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".timeline-section");

  sections.forEach((section) => {
    const progress = section.querySelector(".timeline-progress");
    const circles = Array.from(section.querySelectorAll(".timeline-circle"));
    const numbers = Array.from(section.querySelectorAll(".timeline-number"));
    if (!progress || (circles.length === 0 && numbers.length === 0)) return;

    // Reset state
    [...circles, ...numbers].forEach((el) => el.classList.remove("active"));
    progress.style.height = "0%";

    let ticking = false;
    const threshold = 20; // px before the element center activates

    function update() {
      const sectionRect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // how far we've progressed through the section (0..1)
      const scrollTop = windowH - sectionRect.top;
      const sectionSpan = sectionRect.height + windowH;
      const scrollPercent = Math.min(Math.max(scrollTop / sectionSpan, 0), 1);

      // update progress height
      const progressHeight = scrollPercent * sectionRect.height;
      progress.style.height = scrollPercent * 100 + "%";

      // activate circles
      circles.forEach((circle) => {
        const circleRect = circle.getBoundingClientRect();
        const circleCenter = circleRect.top - sectionRect.top + circleRect.height / 2;
        circle.classList.toggle("active", progressHeight + threshold >= circleCenter);
      });

      // activate numbers
      numbers.forEach((number) => {
        const numberRect = number.getBoundingClientRect();
        const numberCenter = numberRect.top - sectionRect.top + numberRect.height / 2;
        number.classList.toggle("active", progressHeight + threshold >= numberCenter);
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    // Run initially and on scroll/resize
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
  });
});

// Function to Adjust Container width
document.addEventListener("DOMContentLoaded", function () {
  function adjustWidths() {
    var containers2 = document.querySelectorAll(".container-2");
    var mainContainer = document.querySelector(".container");

    if (mainContainer) {
      containers2.forEach(function (lastContainer) {
        var rectMainContainer = mainContainer.getBoundingClientRect();
        var newWidth = rectMainContainer.left + rectMainContainer.width;
        if (newWidth > 0) {
          lastContainer.style.width = newWidth + "px";
          lastContainer.style.maxWidth = newWidth + "px";
        }
      });
    }
  }

  // Adjust widths initially and on resize or orientation change
  adjustWidths();
  window.addEventListener("resize", adjustWidths);
  window.addEventListener("orientationchange", adjustWidths);
});

document.querySelectorAll(".player").forEach(function (el) {
  const player = new Plyr(el, {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "duration",
      "mute",
      "volume",
      "settings",
      "fullscreen",
    ],
  });
});

document.querySelectorAll(".player-2").forEach(function (el) {
  const player = new Plyr(el, {
    controls: ["play-large"],
  });
});
