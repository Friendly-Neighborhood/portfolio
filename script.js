// script.js

const projects = [
  {
    slug: "mobile-app",
    title: "Gym Assistant",
    desc: "AI-powered fitness and nutrition companion for individuals and professional trainers.",
    tags: ["Mobile", "iOS", "Android", "React Native"],
    thumb: "./cover.png",
    year: "2025",            // optional
    role: "Design + Dev",    // optional
    impact: "Fast MVP" // optional
  }
  // ...more projects
];

// tiny escape to avoid HTML injection if content ever becomes dynamic
function esc(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// theme (persisted + respects system when not set)
function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const saved = localStorage.getItem("theme"); // "light" | "dark" | null
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;

  toggle.addEventListener("click", () => {
    const current = root.dataset.theme;
    const next = current === "light" ? "dark" : "light";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  if (!Array.isArray(projects) || projects.length === 0) {
    grid.innerHTML = `<div class="empty">Projects are loading…</div>`;
    return;
  }

  grid.innerHTML = projects
    .map((p) => {
      const title = esc(p.title);
      const desc = esc(p.desc);
      const slug = encodeURIComponent(p.slug);
      const thumb = esc(p.thumb || "");
      const tags = Array.isArray(p.tags) ? p.tags : [];

      const tagsHtml = tags
        .map((t) => `<span class="tag">${esc(t)}</span>`)
        .join("");

      const metaBits = [p.year, p.role, p.impact].filter(Boolean).map(esc);
      const metaHtml =
        metaBits.length > 0
          ? `<div class="meta-row">${metaBits.map((m) => `<span class="meta-chip">${m}</span>`).join("")}</div>`
          : "";

      return `
        <a class="card" href="project.html?slug=${slug}" aria-label="${title}">
          <img src="${thumb}" alt="${title} thumbnail" loading="lazy">
          <div class="title">${title}</div>
          <div class="desc">${desc}</div>
          ${metaHtml}
          <div class="tags" aria-label="Tags">${tagsHtml}</div>
        </a>
      `;
    })
    .join("");
}

function initYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initTheme();
  renderProjects();
});
