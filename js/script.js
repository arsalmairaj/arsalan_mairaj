// Loader section start
gsap.fromTo(
  ".preloader-logo",
  { opacity: 1 },
  {
    opacity: 0,
    display: "none",
    duration: 1.5,
    delay: 3,
  }
);
gsap.fromTo(
  ".l-name",
  {
    y: 50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 2,
    delay: 0.5,
  }
);
// Loader section end

// hero section
 const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  let lastScrollTop = 0;
  let ticking = false;
        function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }

      // Custom smooth scroll function
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

  if(navbar && sections.length && navLinks.length){
      window.addEventListener("scroll", function () {
        if(!ticking){
          window.requestAnimationFrame(function(){
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

              // active link logic
               let current = "";
                sections.forEach((section) => {
                const sectionTop = section.offsetTop - navbarHeight; // offset for navbar
                const sectionHeight = section.offsetHeight;

                if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
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