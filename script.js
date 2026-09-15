/* =========================================================
   POSITIVE PARENTING WEBSITE
   JAVASCRIPT
   ========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (navToggle && mainNav) {

        navToggle.addEventListener("click", function () {

            mainNav.classList.toggle("open");

        });


        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("open");

            });

        });

    }


    /* =====================================================
       REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       RESEARCH COUNTER
       ===================================================== */

    const counters = document.querySelectorAll(".stat-number");

    function animateCounter(element) {

        const target = Number(
            element.getAttribute("data-target")
        );

        let current = 0;

        const duration = 1400;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            current = Math.floor(
                target * easedProgress
            );

            element.textContent = current;

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                element.textContent = target;

            }

        }


        requestAnimationFrame(updateCounter);

    }


    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observerInstance.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", function (event) {

        if (!mainNav || !navToggle) {
            return;
        }

        const clickedInsideNav =
            mainNav.contains(event.target);

        const clickedToggle =
            navToggle.contains(event.target);

        if (
            !clickedInsideNav &&
            !clickedToggle
        ) {

            mainNav.classList.remove("open");

        }

    });


    /* =====================================================
       REDUCED MOTION SUPPORT
       ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reducedMotion.matches) {

        document.documentElement.style.scrollBehavior =
            "auto";

        revealElements.forEach(function (element) {

            element.style.transition = "none";

            element.classList.add("visible");

        });

    }

});
