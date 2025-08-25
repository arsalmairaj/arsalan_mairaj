// Loader section start
const timeLine = gsap.timeline();
timeLine.fromTo(
  ".name",
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 2, delay: 0.5 }
);
timeLine.to(
  ".preloader-logo",
  { opacity: 0, display: "none", duration: 1.5 },
  6
);
// Loader section end
// hero section start
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar .nav-link");
let lastScrollTop = 0;
let ticking = false;
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY || document.documentElement.scrollTop;
  const distance = targetY - startY;
  let startTime = null;
  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuad(progress);
    window.scrollTo(0, startY + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
}
if (navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        smoothScrollTo(targetPosition, 800); // 800ms duration
      }
    });
  });
}
if (navbar && sections.length && navLinks.length) {
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const navbarHeight = navbar.offsetHeight;

        if (scrollTop > lastScrollTop) {
          navbar.style.transform = "translateY(-100%)";
          navbar.style.opacity = "0";
        } else {
          navbar.style.transform = "translateY(0)";
          navbar.style.opacity = "1";
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        let current = "";
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - navbarHeight; // offset for navbar
          const sectionHeight = section.offsetHeight;

          if (
            scrollTop >= sectionTop &&
            scrollTop < sectionTop + sectionHeight
          ) {
            current = section.getAttribute("id");
          }
        });
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  });
}
let typed = new Typed("#auto-type", {
  strings: [
    "Full stack Developer !",
    "Web Designer !",
    "Mern Stack Developer!",
  ],
  typeSpeed: 50,
  backSpeed: 50,
  loop: true,
  showCursor: false,
  cursorChar: "|",
});
// button animation
const elements = document.querySelectorAll('.ripple')
// hero section end

// skill section start
let hasAnimated = false;
function animateProgressBars() {
  if (hasAnimated) return;
  hasAnimated = true;
  let circles = document.querySelectorAll(".circle");
  circles.forEach(function (progress) {
    let degree = 0;
    const targetDegree = parseInt(progress.getAttribute("data-degree"));
    const color = progress.getAttribute("data-color");
    const shadowClass = progress.getAttribute("data-shadow-class");
    const number = progress.querySelector(".number");
     number.style.display = 'block';
     
    let baseShadow;
    const shadowElement = document.querySelector(`.${shadowClass}`);
    if (shadowElement) {
      baseShadow = getComputedStyle(shadowElement).boxShadow;
    } else {
      baseShadow = `0 0 20px ${color}, 0 0 60px ${color}, 0 0 80px ${color}`;
    }
    const interval = setInterval(function () {
      degree += 1;
      if (degree > targetDegree) {
        clearInterval(interval);
        return;
      }
      progress.style.background = `conic-gradient(${color} ${degree}%, #222 0%)`;
      number.innerHTML = degree + "<span>%</span>";
      number.style.color = color;

      const progressFraction = degree / targetDegree;
      const shadowParts = baseShadow.split(", ").map((part) => {
        const values = part.split(" ");
        const shadowColor = values[3] || color;
        const spread = parseFloat(values[2]) * progressFraction * 1.2;
        return `0 0 ${spread}px ${shadowColor}`;
      });
      progress.style.boxShadow = shadowParts.join(", ");
      progress.style.transition = "box-shadow 0.5s ease-in-out";
      progress.classList.add("glowing");
    }, 50);
  });
}
document.addEventListener("click", function (event) {
  if (event.target.closest(".skill-link")) {
    animateProgressBars();
  }
});
// skill section end
// contact start
   document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Name is required!',
        });
        return;
      }
      if (!email) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Email is required!',
        });
        return;
      }
      if (!emailRegex.test(email)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please enter a valid email address!',
        });
        return;
      }
      if (!message) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Message is required!',
        });
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Form submitted successfully!',
      }).then(() => {
        document.getElementById('contactForm').reset();
      });
    });
// contact end
