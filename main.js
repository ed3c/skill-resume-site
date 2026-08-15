(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const menuButton = document.getElementById("menu-button");
  const overlay = document.getElementById("mobile-overlay");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlayDismiss = overlay?.querySelector(".overlay-dismiss");
  const languageButtons = [
    document.getElementById("language-toggle"),
    document.getElementById("mobile-language-toggle"),
  ].filter(Boolean);
  const viewLinks = [...document.querySelectorAll("[data-view-link]")];
  const panels = [...document.querySelectorAll("[data-view-panel]")];
  const stats = [...document.querySelectorAll(".stat-value[data-target]")];
  const video = document.querySelector(".bg-video");
  const validViews = new Set(["home", "services", "work", "contact"]);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentView = "home";
  let projectDataLoaded = false;
  let lastMenuTrigger = null;

  const savedLanguage = safeStorageGet("portfolio-language");
  const initialLanguage = savedLanguage === "zh-Hant" || savedLanguage === "en"
    ? savedLanguage
    : (navigator.language || "").toLowerCase().startsWith("zh") ? "zh-Hant" : "en";

  setLanguage(initialLanguage, false);
  applyView(viewFromHash(), false);
  setVideoPreference();

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const next = root.dataset.lang === "en" ? "zh-Hant" : "en";
      setLanguage(next, true);
    });
  });

  viewLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const view = link.dataset.viewLink;
      if (!validViews.has(view)) return;
      event.preventDefault();
      navigate(view);
      closeMenu(false);
    });
  });

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    open ? closeMenu(true) : openMenu();
  });

  overlayDismiss?.addEventListener("click", () => closeMenu(true));

  overlay?.addEventListener("click", (event) => {
    if (event.target === overlay) closeMenu(true);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (menuButton?.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      } else if (currentView !== "home") {
        navigate("home");
      }
    }

    if (event.key === "Tab" && menuButton?.getAttribute("aria-expanded") === "true") {
      trapMenuFocus(event);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeMenu(false);
  });

  window.addEventListener("hashchange", () => applyView(viewFromHash(), true));
  reduceMotion.addEventListener?.("change", setVideoPreference);

  setupStats();

  function viewFromHash() {
    const candidate = window.location.hash.replace(/^#/, "").trim();
    return validViews.has(candidate) ? candidate : "home";
  }

  function navigate(view) {
    if (!validViews.has(view)) return;
    const hash = `#${view}`;
    if (window.location.hash === hash) {
      applyView(view, true);
      return;
    }
    history.pushState(null, "", hash);
    applyView(view, true);
  }

  function applyView(view, moveFocus) {
    currentView = validViews.has(view) ? view : "home";
    body.dataset.view = currentView;

    panels.forEach((panel) => {
      const active = panel.dataset.viewPanel === currentView;
      panel.classList.toggle("is-active", active);
      panel.setAttribute("aria-hidden", String(!active));
      if ("inert" in panel) panel.inert = !active;
    });

    viewLinks.forEach((link) => {
      const active = link.dataset.viewLink === currentView;
      link.classList.toggle("is-active", active);
      active ? link.setAttribute("aria-current", "page") : link.removeAttribute("aria-current");
    });

    if (currentView === "work") loadProjects();

    if (moveFocus) {
      requestAnimationFrame(() => {
        const target = currentView === "home"
          ? document.getElementById("hero-title")
          : document.querySelector(`[data-view-panel="${currentView}"] h2`);
        target?.focus({ preventScroll: true });
      });
    }
  }

  function openMenu() {
    if (!overlay || !menuButton) return;
    lastMenuTrigger = document.activeElement;
    overlay.hidden = false;
    body.classList.add("menu-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", root.dataset.lang === "zh-Hant" ? "關閉導覽選單" : "Close navigation menu");
    requestAnimationFrame(() => mobileMenu?.querySelector("a, button")?.focus());
  }

  function closeMenu(restoreFocus) {
    if (!overlay || !menuButton || overlay.hidden) return;
    overlay.hidden = true;
    body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", root.dataset.lang === "zh-Hant" ? "開啟導覽選單" : "Open navigation menu");
    if (restoreFocus) (lastMenuTrigger || menuButton).focus();
  }

  function trapMenuFocus(event) {
    if (!mobileMenu) return;
    const focusable = [...mobileMenu.querySelectorAll("a[href], button:not([disabled])")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function setLanguage(language, persist) {
    const lang = language === "zh-Hant" ? "zh-Hant" : "en";
    root.dataset.lang = lang;
    root.lang = lang === "zh-Hant" ? "zh-Hant" : "en";
    languageButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(lang === "zh-Hant"));
      button.setAttribute(
        "aria-label",
        lang === "zh-Hant" ? "Switch to English" : "切換為繁體中文",
      );
    });
    if (menuButton) {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute(
        "aria-label",
        lang === "zh-Hant"
          ? (open ? "關閉導覽選單" : "開啟導覽選單")
          : (open ? "Close navigation menu" : "Open navigation menu"),
      );
    }
    if (persist) safeStorageSet("portfolio-language", lang);
  }

  async function loadProjects() {
    if (projectDataLoaded) return;
    const container = document.getElementById("project-list");
    if (!container) return;

    try {
      const response = await fetch("data/portfolio.json", { cache: "no-cache" });
      if (!response.ok) throw new Error(`Project data returned ${response.status}`);
      const data = await response.json();
      const projects = Array.isArray(data.projects)
        ? data.projects.filter((project) => project.visibility === "public" && project.featured)
        : [];
      if (!projects.length) throw new Error("No featured public projects were found");

      const fragment = document.createDocumentFragment();
      projects.forEach((project) => fragment.appendChild(buildProjectRow(project)));
      container.replaceChildren(fragment);
      projectDataLoaded = true;
    } catch (error) {
      const message = document.createElement("p");
      message.className = "project-error";
      message.textContent = root.dataset.lang === "zh-Hant"
        ? "目前無法載入專案資料。請直接查看 GitHub。"
        : "Project data could not load. Open GitHub to view the repositories.";
      container.replaceChildren(message);
      console.error(error);
    }
  }

  function buildProjectRow(project) {
    const article = document.createElement("article");
    article.className = "project-row";

    const copy = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = project.name;

    const summary = document.createElement("p");
    appendLocalizedText(summary, project.summary?.en || "", project.summary?.["zh-Hant"] || project.summary?.en || "");

    const meta = document.createElement("div");
    meta.className = "project-meta";
    const evidence = document.createElement("span");
    appendLocalizedText(evidence, project.evidence?.en || "Public project", project.evidence?.["zh-Hant"] || "公開專案");
    const area = document.createElement("span");
    appendLocalizedText(area, project.area?.en || "Software", project.area?.["zh-Hant"] || "軟體系統");
    meta.append(evidence, area);
    copy.append(title, summary, meta);
    article.append(copy);

    if (project.url) {
      const link = document.createElement("a");
      link.className = "project-arrow";
      link.href = project.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `Open ${project.name} on GitHub`);
      link.textContent = "↗";
      article.append(link);
    }

    return article;
  }

  function appendLocalizedText(parent, english, chinese) {
    const en = document.createElement("span");
    en.lang = "en";
    en.textContent = english;
    const zh = document.createElement("span");
    zh.lang = "zh-Hant";
    zh.textContent = chinese;
    parent.append(en, zh);
  }

  function setupStats() {
    if (!stats.length) return;

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      stats.forEach(setFinalStat);
      return;
    }

    const footer = document.querySelector(".stats");
    if (!footer) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      stats.forEach((element, index) => {
        window.setTimeout(() => animateStat(element, index), 480 + index * 90);
      });
      observer.disconnect();
    }, { threshold: 0.25 });

    observer.observe(footer);
  }

  function animateStat(element, index) {
    const target = Number(element.dataset.target || 0);
    const decimals = Number(element.dataset.decimals || 0);
    const prefix = element.dataset.prefix || "";
    const suffix = element.dataset.suffix || "";
    const duration = 1500 + index * 80;
    const started = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      element.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
      else setFinalStat(element);
    };

    element.textContent = `${prefix}${Number(0).toFixed(decimals)}${suffix}`;
    requestAnimationFrame(tick);
  }

  function setFinalStat(element) {
    const target = Number(element.dataset.target || 0);
    const decimals = Number(element.dataset.decimals || 0);
    element.textContent = `${element.dataset.prefix || ""}${target.toFixed(decimals)}${element.dataset.suffix || ""}`;
  }

  function setVideoPreference() {
    if (!video) return;
    const saveData = navigator.connection?.saveData === true;
    if (reduceMotion.matches || saveData) {
      video.pause();
      video.removeAttribute("autoplay");
    } else {
      video.setAttribute("autoplay", "");
      const play = video.play();
      play?.catch?.(() => {});
    }
  }

  function safeStorageGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function safeStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch { /* Storage is optional. */ }
  }
})();
