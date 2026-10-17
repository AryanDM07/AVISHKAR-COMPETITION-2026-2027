
/* =====================================================
   POSITIVE PARENTING WEBSITE
   AVISHKAR Competition 2026–2027
   Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     1. MOBILE NAVIGATION
  =================================================== */

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {

    const openMenu = () => {
      mainNav.classList.add("open");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close navigation");
    };

    const closeMenu = () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close the menu after a navigation link is selected.
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu when the user clicks outside it.
    document.addEventListener("click", (event) => {
      const clickedInsideMenu = mainNav.contains(event.target);
      const clickedToggle = navToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    });

    // Allow keyboard users to close the menu with Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close the mobile menu when returning to desktop layout.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });

  }


  /* ===================================================
     2. SIX INTERACTIVE PARENTING SCENARIOS

     Each card is a native HTML button.

     One click:
       - Reveals its answer.
       - Updates aria-expanded.
       - Adds the is-open styling.
       - Updates the instruction text.

     Another click:
       - Hides the answer again.

     IMPORTANT:
     Do not add a second scenario-card click listener
     in the HTML or another JavaScript file.
  =================================================== */

  const scenarioCards = document.querySelectorAll(".scenario-card");

  scenarioCards.forEach((card) => {

    const answer = card.querySelector(".scenario-answer");
    const hint = card.querySelector(".scenario-hint");

    // Skip a card if its answer element is missing.
    if (!answer) {
      return;
    }

    // Ensure each card begins in the closed state.
    answer.hidden = true;
    card.classList.remove("is-open");
    card.setAttribute("aria-expanded", "false");

    if (hint) {
      hint.textContent = "↗ Tap to reveal the answer";
    }

    // This is the ONLY click listener needed per card.
    card.addEventListener("click", () => {

      const isCurrentlyOpen =
        card.getAttribute("aria-expanded") === "true";

      const shouldOpen = !isCurrentlyOpen;

      // Show or hide the answer.
      answer.hidden = !shouldOpen;

      // Update accessibility state.
      card.setAttribute("aria-expanded", String(shouldOpen));

      // Update the visual card state.
      card.classList.toggle("is-open", shouldOpen);

      // Update the instruction displayed to the viewer.
      if (hint) {
        hint.textContent = shouldOpen
          ? "↩ Tap to hide the answer"
          : "↗ Tap to reveal the answer";
      }

    });

  });


  /* ===================================================
     3. SCROLL REVEAL SUPPORT

     Elements with the .reveal class become visible
     when they enter the viewport.

     If IntersectionObserver is unavailable, the
     content remains visible rather than disappearing.
  =================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  } else {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  }


  /* ===================================================
     4. AUTOMATIC COPYRIGHT YEAR

     Add data-current-year to any HTML element if you
     want the current year to appear automatically.
  =================================================== */

  const yearElements = document.querySelectorAll(
    "[data-current-year]"
  );

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });


  /* ===================================================
     5. EXTERNAL LINK SECURITY

     Add safe rel attributes to links opening in a
     separate browser tab.
  =================================================== */

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });

});
