import { initParallax } from "./parallax.js";
import { initEnquiry } from "./enquiry.js";

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  initParallax();
  initEnquiry();

  const revealEls = Array.from(document.querySelectorAll('[data-reveal="true"]'));
  const revealOnScroll = () => {
    const vh = window.innerHeight * 0.9;
    for (const el of revealEls) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh) {
        el.classList.add('reveal-visible');
      }
    }
  };
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll, { passive: true });


  const aboutContentEl = document.getElementById('about-content');
  try {
    const md = await fetch('content/content.md').then(r => r.text());
    aboutContentEl.innerHTML = marked.parse(md);
  } catch {
    aboutContentEl.innerHTML = "<p>Welcome to Ms Kathi Book Store, a sanctuary for readers and dreamers alike.</p>";
  }


  const grid = document.getElementById('collection-grid');
  try {
    const cats = await fetch('data/categories.json').then(r => r.json());
    cats.forEach(cat => {
      const card = document.createElement('article');
      card.className = "bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow";
      card.innerHTML = `
        <div class="h-40 bg-cover" style="background-image:url('${cat.image}');"></div>
        <div class="p-4">
          <h3 class="text-lg font-serif mb-1" style="color:#1b1b1b;">${cat.name}</h3>
          <p class="text-sm text-gray-600 mb-3">${cat.description}</p>
          <button class="btn-primary w-full">Enquire</button>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch {
    grid.innerHTML = "<p>Collection data is currently unavailable. Please check back soon.</p>";
  }


  const tContainer = document.getElementById('testimonials-container');
  try {
    const testimonials = await fetch('data/testimonials.json').then(r => r.json());
    testimonials.forEach((t, idx) => {
      const slide = document.createElement('div');
      slide.className = "min-w-full bg-white rounded-md p-4 shadow-md";
      slide.style.flex = "0 0 100%";
      slide.innerHTML = `
        <p class="text-gray-800 italic">"${t.text}"</p>
        <p class="text-sm mt-2 text-gray-700">— ${t.name}</p>
      `;
      tContainer.appendChild(slide);
    });
  } catch {
    tContainer.innerHTML = "<div class='p-4'>No testimonials at the moment.</div>";
  }


  const slides = tContainer.children;
  let index = 0;
  const showSlide = (i) => {
    for (let s of slides) s.style.display = 'none';
    if (slides[i]) slides[i].style.display = 'block';
  };
  showSlide(index);
  document.getElementById('next').addEventListener('click', () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });
  document.getElementById('prev').addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });
});
