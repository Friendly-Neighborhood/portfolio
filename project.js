/* Minimal theme toggle parity with index page if needed */
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const params = new URLSearchParams(location.search);
  const slug = params.get('slug') || 'mobile-app'; // default
  renderProject(slug);
});

/* Example project data — replace paths/txt with your real assets/content */
const PROJECTS = {
  'mobile-app': {
    title: 'Gym Assistant',
    subtitle: 'React Native Developer • iOS + Android',
    role: 'React Native Developer',
    year: '2025',
    stack: 'React Native, JavaScript, TypeScript, Redux, REST API, Git',
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/ua/app/gymapp/id6744613127', external: true },
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.gym.myapplication', external: true },
      { label: 'Site', href: 'https://gym-bot.site/', external: true }
    ],
    features: [],
    heroImage: './cover.png',
    overview: `Gym Assistant is your AI-powered fitness and nutrition companion, designed for both individuals and professional trainers.



With Gym Assistant, you can:


Track your meals and calories with precision


Analyze proteins, fats, and carbs (PFC) per product or per day


Receive personalized nutrition recommendations based on your age, weight, height, and fitness goals


View daily summaries with vitamin and mineral breakdowns


Manage multiple clients and provide them with structured feedback


Create and reuse custom meal templates


Use the app in Russian or Ukrainian


Interact through an intuitive chatbot interface


Whether your goal is weight loss, maintenance, or muscle gain — Gym Assistant helps you stay on track and understand your nutrition better.


Built-in tools for trainers make it easy to support clients with confidence and clarity`,
    process: [

    ],
    images: [
      { src: './IMG_20250907_111327_702.png', alt: 'Nutrition screen' },
      { src: './IMG_20250907_111333_266.png', alt: 'Templates Screen' },
      { src: './IMG_20250907_111335_331.png', alt: 'Nutrition screen' },
      { src: './IMG_20250907_111350_829.png', alt: 'Chat screen' },
    ],
    seoImage: '/cover.jpg'
  }
};

function renderProject(slug) {
  const data = PROJECTS[slug];
  if (!data) return;

  // Titles & meta
  document.getElementById('projTitle').textContent = data.title;
  document.getElementById('projSubtitle').textContent = data.subtitle;
  document.getElementById('heroImage').src = data.heroImage;
  document.getElementById('heroImage').alt = `3D phone render of ${data.title}`;
  document.getElementById('docTitle').textContent = `${data.title} — Case Study`;
  document.getElementById('ogTitle').setAttribute('content', `${data.title} — Case Study`);
  document.getElementById('ogDesc').setAttribute('content', data.overview);
  document.getElementById('ogImage').setAttribute('content', data.seoImage);

  // Schema
  const schemaEl = document.getElementById('schema');
  const schema = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": data.title,
    "operatingSystem": "iOS, Android",
    "applicationCategory": "LifestyleApplication",
    "creator": { "@type": "Person", "name": "Your Name" },
    "description": data.overview,
    "image": [data.seoImage],
    "url": location.href
  };
  schemaEl.textContent = JSON.stringify(schema);

  // Facts
  const facts = document.getElementById('projFacts');
  facts.innerHTML = `
    <li><strong>Role:</strong> ${data.role}</li>
    <li><strong>Year:</strong> ${data.year}</li>
    <li><strong>Stack:</strong> ${data.stack}</li>
    <li><strong>Links:</strong> ${
      data.links.map(l => `<a href="${l.href}" ${l.external?'target="_blank" rel="noopener"':''}>${l.label}</a>`).join(' · ')
    }</li>
  `;

  // Features
  const features = document.getElementById('features');
  features.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

  // Overview + process
  document.getElementById('overview').textContent = data.overview;
  const process = document.getElementById('process');
  process.innerHTML = data.process.map(p => `<p>${p}</p>`).join('');

  // Gallery
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = data.images.map((img, i) => `
    <figure>
      <img src="${img.src}" alt="${img.alt}" loading="lazy" data-index="${i}">
      <figcaption>${img.alt}</figcaption>
    </figure>
  `).join('');

  // Lightbox wiring
  setupLightbox(data.images);
}

function setupLightbox(images) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImage');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  let index = 0;

  const open = (i) => {
    index = i;
    lbImg.src = images[index].src;
    lbImg.alt = images[index].alt;
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };
  const close = () => {
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  const prev = () => open((index - 1 + images.length) % images.length);
  const next = () => open((index + 1) % images.length);

  document.getElementById('gallery').addEventListener('click', (e) => {
    const img = e.target.closest('img[data-index]');
    if (!img) return;
    open(parseInt(img.dataset.index, 10));
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

  document.addEventListener('keydown', (e) => {
    if (lb.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
}
