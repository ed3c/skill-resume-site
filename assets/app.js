const state = {
  data: null,
  lang: localStorage.getItem("portfolio-language") || "en",
  filter: "all",
};

const root = document.documentElement;
const languageToggle = document.querySelector("#language-toggle");
const capabilityGrid = document.querySelector("#capability-grid");
const projectGrid = document.querySelector("#project-grid");
const roleGrid = document.querySelector("#role-grid");
const deliverySteps = document.querySelector("#delivery-steps");
const filters = [...document.querySelectorAll("[data-filter]")];

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function localized(item, key) {
  const suffix = state.lang === "zh-Hant" ? "zh" : "en";
  return item[`${key}_${suffix}`] ?? item[key] ?? "";
}

function setLanguage(lang) {
  state.lang = lang === "zh-Hant" ? "zh-Hant" : "en";
  root.dataset.lang = state.lang;
  root.lang = state.lang;
  languageToggle.setAttribute("aria-pressed", String(state.lang === "zh-Hant"));
  localStorage.setItem("portfolio-language", state.lang);
  if (state.data) {
    renderAll();
  }
}

function renderCapabilities() {
  capabilityGrid.innerHTML = state.data.capabilities.map((capability) => {
    const tags = capability.stack
      .map((tag) => `<li>${escapeHTML(tag)}</li>`)
      .join("");

    return `
      <article class="capability-card reveal is-visible">
        <div>
          <h3>${escapeHTML(localized(capability, "area"))}</h3>
        </div>
        <span class="capability-status" data-state="${escapeHTML(capability.status_key)}">
          ${escapeHTML(localized(capability, "status"))}
        </span>
        <p>${escapeHTML(localized(capability, "summary"))}</p>
        <ul class="tag-list" aria-label="Technology stack">${tags}</ul>
      </article>
    `;
  }).join("");
}

function projectVisibilityLabel(visibility) {
  if (state.lang === "zh-Hant") {
    return visibility === "public" ? "公開" : "私有";
  }
  return visibility === "public" ? "Public" : "Private";
}

function renderProjects() {
  const projects = state.data.projects.filter(
    (project) => state.filter === "all" || project.visibility === state.filter,
  );

  projectGrid.innerHTML = projects.map((project) => {
    const tags = project.tags.map((tag) => `<li>${escapeHTML(tag)}</li>`).join("");
    const link = project.url
      ? `<a class="project-link" href="${escapeHTML(project.url)}" rel="noopener noreferrer">
          ${state.lang === "zh-Hant" ? "查看 Repository" : "Inspect repository"} <span aria-hidden="true">↗</span>
        </a>`
      : "";

    return `
      <article class="project-card reveal is-visible" data-visibility="${escapeHTML(project.visibility)}">
        <div class="project-card__head">
          <span class="project-visibility" data-visibility="${escapeHTML(project.visibility)}">
            ${escapeHTML(projectVisibilityLabel(project.visibility))}
          </span>
          <span class="project-status" data-state="${escapeHTML(project.status_key)}">
            ${escapeHTML(localized(project, "status"))}
          </span>
        </div>
        <h3>${escapeHTML(project.title)}</h3>
        <p class="project-summary">${escapeHTML(localized(project, "summary"))}</p>
        <p class="project-proof">${escapeHTML(localized(project, "proof"))}</p>
        <ul class="tag-list" aria-label="Project technologies">${tags}</ul>
        ${link}
      </article>
    `;
  }).join("");

  if (projects.length === 0) {
    projectGrid.innerHTML = `<p class="error-message">${
      state.lang === "zh-Hant" ? "此篩選條件沒有項目。" : "No projects match this filter."
    }</p>`;
  }
}

function renderRoles() {
  roleGrid.innerHTML = state.data.roles.map((role) => `
    <article class="role-card reveal is-visible">
      <div>
        <h3>${escapeHTML(localized(role, "title"))}</h3>
        <span class="role-priority">${escapeHTML(localized(role, "priority"))}</span>
      </div>
      <div class="role-column">
        <strong>${state.lang === "zh-Hant" ? "現有證據" : "Current proof"}</strong>
        <p>${escapeHTML(localized(role, "current"))}</p>
      </div>
      <div class="role-column">
        <strong>${state.lang === "zh-Hant" ? "下一個證據" : "Next proof"}</strong>
        <p>${escapeHTML(localized(role, "next"))}</p>
      </div>
    </article>
  `).join("");
}

function renderSteps() {
  const key = state.lang === "zh-Hant" ? "steps_zh" : "steps_en";
  deliverySteps.innerHTML = state.data.delivery_loop[key].map((step, index) => `
    <article class="step-card reveal is-visible">
      <strong>${String(index + 1).padStart(2, "0")}</strong>
      <span>${escapeHTML(step)}</span>
    </article>
  `).join("");
}

function renderAll() {
  renderCapabilities();
  renderProjects();
  renderRoles();
  renderSteps();
}

async function loadPortfolio() {
  try {
    const response = await fetch("data/portfolio.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Portfolio request failed: ${response.status}`);
    }
    state.data = await response.json();
    renderAll();
  } catch (error) {
    const message = state.lang === "zh-Hant"
      ? "無法載入 Portfolio 資料。請重新整理頁面。"
      : "Portfolio data could not be loaded. Refresh the page.";
    [capabilityGrid, projectGrid, roleGrid, deliverySteps].forEach((element) => {
      element.innerHTML = `<p class="error-message">${escapeHTML(message)}</p>`;
    });
    console.error(error);
  }
}

languageToggle.addEventListener("click", () => {
  setLanguage(state.lang === "en" ? "zh-Hant" : "en");
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    filters.forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle("is-active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });
    if (state.data) {
      renderProjects();
    }
  });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
setLanguage(state.lang);
loadPortfolio();
