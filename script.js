// ====== ORBIT BACKGROUND ======
const canvas = document.getElementById('bg-orbits');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

const PARTICLE_COUNT = 40;
const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  radius: Math.random() * 2 + 0.5,
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.25,
  vy: (Math.random() - 0.5) * 0.25
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(4, 7, 24, 0.9)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < -20 || p.x > canvas.width + 20) p.vx *= -1;
    if (p.y < -20 || p.y > canvas.height + 20) p.vy *= -1;

    const glowRadius = p.radius * 8;
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
    gradient.addColorStop(0, 'rgba(84, 240, 255, 0.9)');
    gradient.addColorStop(1, 'rgba(3, 5, 18, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

// ====== GSAP SCROLL ANIMATIONS & PARALLAX ======
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
  if (window.innerWidth <= 600) {
    // mobile: minimal motion
    return;
  }

  // Section headers
  gsap.from("[data-anim='section']", {
    scrollTrigger: {
      trigger: "[data-anim='section']",
      start: "top 80%"
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });

  // Services
  gsap.from("[data-anim='service']", {
    scrollTrigger: {
      trigger: ".services-grid",
      start: "top 80%"
    },
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
  });

  // Banner
  gsap.from("[data-anim='banner']", {
    scrollTrigger: {
      trigger: ".banner",
      start: "top 85%"
    },
    scale: 0.96,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });

  // About
  gsap.from("[data-anim='about']", {
    scrollTrigger: {
      trigger: ".about-grid",
      start: "top 80%"
    },
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
  });

  // Hero doodles & flow map staggered in
  gsap.from(".hero-title, .hero-sub, .hero-cta-btn", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });

  gsap.from("[data-parallax='hero']", {
    y: 20,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.1,
    delay: 0.1
  });

  // Parallax effect for hero doodles / flow map
  gsap.to("[data-parallax='hero']", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
}

initAnimations();
window.addEventListener("resize", () => {
  ScrollTrigger.getAll().forEach(t => t.kill());
  gsap.globalTimeline.clear();
  initAnimations();
});

// ====== NAV ACTIVE STATE ======
const pageSections = document.querySelectorAll("main, section");
const navLinks = document.querySelectorAll(".nav-link");

function highlightActiveNav() {
  let activeIndex = pageSections.length;

  while (--activeIndex && window.scrollY + 140 < pageSections[activeIndex].offsetTop) {}

  navLinks.forEach(link => link.classList.remove("active"));

  const id = pageSections[activeIndex].id || "home";
  const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
  if (activeLink) activeLink.classList.add("active");
}

window.addEventListener("scroll", highlightActiveNav);
highlightActiveNav();

// ====== BOOK A CALL MODAL + MAILTO ======
const modal = document.getElementById('book-call-modal');
const openBtns = [
  document.getElementById('open-book-call'),
  document.getElementById('open-book-call-main')
];
const closeBtn = document.getElementById('close-book-call');
const form = document.getElementById('book-call-form');

openBtns.forEach(btn => {
  if (!btn) return;
  btn.addEventListener('click', () => {
    modal.classList.add('open');
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('open');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('open');
  }
});

// When submitted, open email client to send details to elevyxagency@gmail.com
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = encodeURIComponent(form.name.value.trim());
  const email = encodeURIComponent(form.email.value.trim());
  const company = encodeURIComponent(form.company.value.trim());
  const message = encodeURIComponent(form.message.value.trim());

  const subject = encodeURIComponent("New Book a Call request – Elevyx Flow");
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : "",
    "",
    "What they want to automate:",
    message || "(not provided)"
  ].filter(Boolean);

  const body = bodyLines.join('%0D%0A');
  const mailto = `mailto:elevyxagency@gmail.com?subject=${subject}&body=${body}`;

  window.location.href = mailto;
  modal.classList.remove('open');
});

// ====== CTA MICRO-INTERACTION ======
function attachCtaHover(selector) {
  const btn = document.querySelector(selector);
  if (!btn) return;
  const arrow = btn.querySelector(".btn-arrow");

  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { boxShadow: "0 0 34px rgba(84,240,255,0.95)", duration: 0.2, ease: "power2.out" });
    if (arrow) gsap.to(arrow, { x: 6, duration: 0.2, ease: "power2.out" });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { boxShadow: "0 0 26px rgba(84,240,255,0.8)", duration: 0.2, ease: "power2.out" });
    if (arrow) gsap.to(arrow, { x: 0, duration: 0.2, ease: "power2.out" });
  });
}

attachCtaHover("#open-book-call");
attachCtaHover("#open-book-call-main");
attachCtaHover(".modal-submit");
