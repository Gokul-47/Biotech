// Basic shared interactions for BioTechnology Nexus

// Helper: route every external-like click to 404 without full navigation for some buttons
function routeButtonsTo404() {
  const to404Buttons = document.querySelectorAll(".to-404");
  to404Buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "404.html";
    });
  });
}

// Helper: ensure nav links that should redirect to 404 behave as regular anchor loads
// (index.html & home2.html already use href="404.html" so no extra JS is required)

// Advanced nav: dropdown & mobile menu
function initNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownBtn = dropdown?.querySelector(".nav-link-dropdown");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
    });
  }

  if (dropdownBtn && dropdown) {
    dropdownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("open");
    });
  }

  // Close dropdown when clicking outside on desktop
  document.addEventListener("click", (e) => {
    if (!dropdown) return;
    if (!dropdown.contains(e.target) && dropdown.classList.contains("open")) {
      dropdown.classList.remove("open");
    }
  });
}

// Scroll-based reveals with IntersectionObserver
function initScrollAnimations() {
  const revealEls = document.querySelectorAll(
    ".reveal-up, .reveal-fade, .reveal-slide, .tilt"
  );

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("reveal-visible"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealEls.forEach((el) => obs.observe(el));
}

// Subtle card tilt on pointer move for elements with .tilt
function initTiltEffects() {
  const tiltCards = document.querySelectorAll(".tilt");

  tiltCards.forEach((card) => {
    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateX = ((y - midY) / midY) * -6;
      const rotateY = ((x - midX) / midX) * 6;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(0)`;
    };

    const reset = () => {
      card.style.transform = "";
    };

    card.addEventListener("pointermove", handleMove);
    card.addEventListener("pointerleave", reset);
  });
}

// Animated number counters for metrics
function initCounters() {
  const counters = document.querySelectorAll(".metric-value");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = Number(el.dataset.count || "0");
    const isPercent = el.textContent?.trim().endsWith("%");
    let current = 0;
    const duration = 1400;
    const start = performance.now();

    const step = (ts) => {
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(target * eased);
      el.textContent = isPercent ? `${current}%` : current.toString();
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((el) => obs.observe(el));
}

// Interactive pipeline tabs
function initPipelineTabs() {
  const stageButtons = document.querySelectorAll(".stage-pill");
  const panels = document.querySelectorAll("[data-stage-panel]");
  if (!stageButtons.length || !panels.length) return;

  stageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const stage = btn.dataset.stage;
      stageButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      panels.forEach((panel) => {
        if (panel.dataset.stagePanel === stage) {
          panel.classList.remove("hidden");
        } else {
          panel.classList.add("hidden");
        }
      });
    });
  });
}

// Footer year
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

// Loading overlay + navigation interception (added)
(function () {
  // Ensure loader exists on every page; create if missing
  let loader = document.getElementById('page-loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.className = 'loader-overlay';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = `
      <div class="loader-content">
        <div class="spinner"></div>
        <p class="loader-text">Loading...</p>
      </div>`;
    document.body.prepend(loader);
  }

  const showLoader = () => loader.classList.remove('hidden');
  const hideLoader = () => loader.classList.add('hidden');

  // Keep loader visible on initial load, then fade out after minimum delay
  const minDelayMs = 600;
  const start = performance.now();
  window.addEventListener('load', () => {
    const elapsed = performance.now() - start;
    const remaining = Math.max(minDelayMs - elapsed, 0);
    setTimeout(hideLoader, remaining);
  });

  // Intercept navigation to show loader, then navigate
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    const download404Btn = e.target.closest('button.to-404');

    // Handle buttons that navigate (e.g., ".to-404")
    if (download404Btn) {
      e.preventDefault();
      showLoader();
      setTimeout(() => { window.location.href = '404.html'; }, 300);
      return;
    }

    if (!anchor) return;

    const href = anchor.getAttribute('href') || '';
    const targetAttr = anchor.getAttribute('target');

    // Skip non-navigational or new-tab links
    if (!href || href.startsWith('#') || targetAttr === '_blank' ||
        href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    // Show loader before navigating
    e.preventDefault();
    showLoader();
    setTimeout(() => { window.location.href = href; }, 300);
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollAnimations();
  initTiltEffects();
  initCounters();
  initPipelineTabs();
  routeButtonsTo404();
  setYear();
  initFooterMap();
});

/* Footer mini-map: toggle and initialize Leaflet map lazily */
function initFooterMap() {
  const showBtn = document.getElementById('show-map-btn');
  const mini = document.getElementById('mini-map');
  const closeBtn = document.getElementById('close-map');
  const mapEl = document.getElementById('leaflet-map');
  if (!showBtn || !mini || !mapEl) return;

  let mapInitialized = false;
  let mapInstance = null;

  // Coordinates for Bengaluru center; adjust if you have a precise location
  const lat = 12.9716;
  const lon = 77.5946;

  const openMap = () => {
    mini.classList.remove('hidden');
    mini.setAttribute('aria-hidden', 'false');
    showBtn.setAttribute('aria-expanded', 'true');

    if (!mapInitialized) {
      try {
        mapInstance = L.map(mapEl).setView([lat, lon], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapInstance);

        L.marker([lat, lon]).addTo(mapInstance);
        mapInitialized = true;
      } catch (e) {
        console.warn('Leaflet not available', e);
      }
    } else {
      mapInstance.invalidateSize();
    }
  };

  const closeMap = () => {
    mini.classList.add('hidden');
    mini.setAttribute('aria-hidden', 'true');
    showBtn.setAttribute('aria-expanded', 'false');
  };

  showBtn.addEventListener('click', () => {
    const isOpen = !mini.classList.contains('hidden');
    if (isOpen) {
      closeMap();
    } else {
      openMap();
    }
  });

  closeBtn?.addEventListener('click', closeMap);

  // Close if clicking outside the popup
  document.addEventListener('click', (e) => {
    if (!mini.contains(e.target) && e.target !== showBtn && !showBtn.contains(e.target)) {
      closeMap();
    }
  });
}




