// script.js (add or adapt)
const projects = [
  {
    slug: 'mobile-app',
    title: 'Gym Assistant',
    desc: 'Gym Assistant is your AI-powered fitness and nutrition companion, designed for both individuals and professional trainers.',
    tags: ['Mobile', 'iOS', 'Android', 'React Native'],
    thumb: './cover.png'
  }
  // ...more projects can go here
];

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = projects.map(p => `
    <a class="card" href="project.html?slug=${encodeURIComponent(p.slug)}" aria-label="${p.title}">
      <img src="${p.thumb}" alt="${p.title} thumbnail">
      <div class="title">${p.title}</div>
      <div class="desc">${p.desc}</div>
      <div class="tags">${p.tags.join(' · ')}</div>
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('force-light');
    document.documentElement.classList.toggle('force-dark');
  });

  renderProjects();
});
