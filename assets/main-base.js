(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const indexButton = document.getElementById("index-button");
  const indexOverlay = document.getElementById("index-overlay");
  const indexPanel = document.getElementById("site-index");
  const indexClose = document.getElementById("index-close");
  const indexDismiss = indexOverlay?.querySelector(".index-dismiss");
  const languageButton = document.getElementById("language-toggle");
  const currentSection = document.getElementById("current-section");
  const progressBar = document.getElementById("scroll-progress-bar");
  const video = document.querySelector(".bg-video");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const indexLinks = [...document.querySelectorAll("[data-index-link]")];
  const sectionLinks = [...document.querySelectorAll(".index-list [data-index-link]")];
  const sections = [...document.querySelectorAll("[data-index-section]")];
  const revealItems = [...document.querySelectorAll(".reveal-on-scroll")];
  const stats = [...document.querySelectorAll(".stat-value[data-target]")];
  const projectFilters = [...document.querySelectorAll("[data-project-filter]")];

  let indexIsOpen = false;
  let indexCloseTimer = 0;
  let previousFocus = null;
  let projectData = null;
  let activeProjectFilter = "all";
  let activeSectionId = "overview";
  let scrollFrame = 0;

  const savedLanguage = safeStorageGet("portfolio-language");
  const initialLanguage = savedLanguage === "zh-Hant" || savedLanguage === "en"
    ? savedLanguage
    : (navigator.language || "").toLowerCase().startsWith("zh") ? "zh-Hant" : "en";

  setLanguage(initialLanguage, false);
  setVideoPreference();
  setupAnchorNavigation();
  setupIndexPanel();
  setupScrollProgress();
  setupScrollSpy();
  setupRevealObserver();
  setupStats();
  setupProjectFilters();
  loadPortfolioData();

  document.getElementById("current-year").textContent = String(new Date().getFullYear());

  languageButton?.addEventListener("click", () => {
    const nextLanguage = root.dataset.lang === "en" ? "zh-Hant" : "en";
    setLanguage(nextLanguage, true);
  });

  reduceMotion.addEventListener?.("change", () => {
    setVideoPreference();
    if (reduceMotion.matches) revealItems.forEach((item) => item.classList.add("is-visible"));
  });

  function setupAnchorNavigation() {
    indexLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href") || "";
        if (!href.startsWith("#")) return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        closeIndex(false);

        const scroll = () => {
          if (target.matches("[data-index-section]")) setActiveSection(target.id);
          target.scrollIntoView({
            behavior: reduceMotion.matches ? "auto" : "smooth",
            block: "start",
          });
          history.pushState(null, "", href);
        };

        window.setTimeout(scroll, indexIsOpen ? 230 : 0);
      });
    });
  }

  function setupIndexPanel() {
    indexButton?.addEventListener("click", () => {
      indexIsOpen ? closeIndex(true) : openIndex();
    });

    indexClose?.addEventListener("click", () => closeIndex(true));
    indexDismiss?.addEventListener("click", () => closeIndex(true));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && indexIsOpen) {
        event.preventDefault();
        closeIndex(true);
      }

      if (event.key === "Tab" && indexIsOpen) trapIndexFocus(event);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) closeIndex(false);
    });
  }

  function openIndex() {
    if (!indexOverlay || !indexButton || indexIsOpen) return;
    window.clearTimeout(indexCloseTimer);
    indexIsOpen = true;
    previousFocus = document.activeElement;
    indexOverlay.hidden = false;
    body.classList.add("index-open");
    indexButton.setAttribute("aria-expanded", "true");
    indexButton.setAttribute("aria-label", localized("Close page index", "關閉頁面索引"));

    requestAnimationFrame(() => {
      indexOverlay.classList.add("is-open");
      indexPanel?.querySelector("a.is-active, a, button")?.focus();
    });
  }

  function closeIndex(restoreFocus) {
    if (!indexOverlay || !indexButton || !indexIsOpen) return;
    indexIsOpen = false;
    indexOverlay.classList.remove("is-open");
    body.classList.remove("index-open");
    indexButton.setAttribute("aria-expanded", "false");
    indexButton.setAttribute("aria-label", localized("Open page index", "開啟頁面索引"));

    const finish = () => {
      indexOverlay.hidden = true;
      if (restoreFocus) (previousFocus || indexButton).focus();
    };

    if (reduceMotion.matches) finish();
    else indexCloseTimer = window.setTimeout(finish, 285);
  }

  function trapIndexFocus(event) {
    if (!indexPanel) return;
    const focusable = [...indexPanel.querySelectorAll("a[href], button:not([disabled])")];
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

  function setupScrollProgress() {
    const update = () => {
      scrollFrame = 0;
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
      if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
    };

    const requestUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
  }

  function setupScrollSpy() {
    if (!sections.length) return;

    let spyFrame = 0;
    const updateFromPosition = () => {
      spyFrame = 0;
      const marker = window.scrollY + Math.min(window.innerHeight * 0.36, 320);
      let next = sections[0].id;

      for (const section of sections) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= marker) next = section.id;
        else break;
      }

      setActiveSection(next);
    };

    const requestSpyUpdate = () => {
      if (spyFrame) return;
      spyFrame = requestAnimationFrame(updateFromPosition);
    };

    window.addEventListener("scroll", requestSpyUpdate, { passive: true });
    window.addEventListener("resize", requestSpyUpdate);
    updateFromPosition();
  }

  function setActiveSection(sectionId) {
    if (!sectionId || sectionId === activeSectionId && sectionLinks.some((link) => link.classList.contains("is-active"))) return;
    activeSectionId = sectionId;

    sectionLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${sectionId}`;
      link.classList.toggle("is-active", active);
      active ? link.setAttribute("aria-current", "location") : link.removeAttribute("aria-current");
    });

    const section = document.getElementById(sectionId);
    const english = section?.dataset.sectionNameEn || "Overview";
    const chinese = section?.dataset.sectionNameZh || "總覽";
    if (currentSection) currentSection.textContent = root.dataset.lang === "zh-Hant" ? chinese : english;
  }

  function setupRevealObserver() {
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });

    revealItems.forEach((item) => observer.observe(item));
  }

  function setupStats() {
    if (!stats.length) return;

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      stats.forEach(setFinalStat);
      return;
    }

    const footer = document.querySelector(".hero-stats");
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

  function setupProjectFilters() {
    projectFilters.forEach((button) => {
      button.addEventListener("click", () => {
        activeProjectFilter = button.dataset.projectFilter || "all";
        projectFilters.forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        renderProjects();
      });
    });
  }

  async function loadPortfolioData() {
    try {
      const response = await fetch("data/portfolio.json", { cache: "no-cache" });
      if (!response.ok) throw new Error(`Portfolio data returned ${response.status}`);
      projectData = await response.json();
      renderCapabilities();
      renderProjects();
    } catch (error) {
      renderDataError(error);
    }
  }

  function renderCapabilities() {
    const container = document.getElementById("capability-list");
    if (!container || !Array.isArray(projectData?.capabilities)) return;

    const fragment = document.createDocumentFragment();
    projectData.capabilities.forEach((capability) => {
      const article = document.createElement("article");
      article.className = "capability-row";

      const heading = document.createElement("h3");
      appendLocalizedText(heading, capability.name?.en || capability.id, capability.name?.["zh-Hant"] || capability.name?.en || capability.id);

      const summary = document.createElement("p");
      appendLocalizedText(summary, capability.summary?.en || "", capability.summary?.["zh-Hant"] || capability.summary?.en || "");

      const state = document.createElement("span");
      state.className = "evidence-state";
      state.dataset.evidence = capability.evidence || "public-builds";
      const labels = evidenceLabel(capability.evidence);
      appendLocalizedText(state, labels.en, labels.zh);

      article.append(heading, summary, state);
      fragment.append(article);
    });

    container.replaceChildren(fragment);
  }

  function renderProjects() {
    const container = document.getElementById("project-list");
    if (!container || !Array.isArray(projectData?.projects)) return;

    const projects = projectData.projects.filter((project) => {
      if (activeProjectFilter === "all") return true;
      return project.visibility === activeProjectFilter;
    });

    const fragment = document.createDocumentFragment();
    projects.forEach((project, index) => fragment.append(buildProjectRow(project, index)));
    container.replaceChildren(fragment);
  }

  function buildProjectRow(project, index) {
    const article = document.createElement("article");
    article.className = "project-row";
    article.dataset.visibility = project.visibility;

    const number = document.createElement("span");
    number.className = "project-index";
    number.textContent = String(index + 1).padStart(2, "0");

    const copy = document.createElement("div");
    copy.className = "project-copy";

    const title = document.createElement("h3");
    title.textContent = project.name;

    const summary = document.createElement("p");
    appendLocalizedText(summary, project.summary?.en || "", project.summary?.["zh-Hant"] || project.summary?.en || "");

    const meta = document.createElement("div");
    meta.className = "project-meta";

    const visibility = document.createElement("span");
    visibility.className = "project-state";
    visibility.dataset.visibility = project.visibility;
    appendLocalizedText(
      visibility,
      project.visibility === "private" ? "Private capability" : project.evidence?.en || "Public build",
      project.visibility === "private" ? "私有能力" : project.evidence?.["zh-Hant"] || "公開實作",
    );

    const area = document.createElement("span");
    appendLocalizedText(area, project.area?.en || "Software system", project.area?.["zh-Hant"] || "軟體系統");

    meta.append(visibility, area);
    copy.append(title, summary, meta);
    article.append(number, copy);

    if (project.visibility === "public" && project.url) {
      const link = document.createElement("a");
      link.className = "project-link";
      link.href = project.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `Open ${project.name} on GitHub`);
      link.textContent = "↗";
      article.append(link);
    } else {
      const lock = document.createElement("span");
      lock.className = "project-lock";
      lock.setAttribute("aria-label", localized("Private repository link withheld", "私有 Repository 連結不公開"));
      lock.innerHTML = '<i class="fa-solid fa-lock" aria-hidden="true"></i>';
      article.append(lock);
    }

    return article;
  }

  function renderDataError(error) {
    ["capability-list", "project-list"].forEach((id) => {
      const container = document.getElementById(id);
      if (!container) return;
      const message = document.createElement("p");
      message.className = "project-error";
      message.textContent = localized(
        "Portfolio evidence could not load. Open GitHub to review the repositories.",
        "目前無法載入履歷證據，請直接查看 GitHub。",
      );
      container.replaceChildren(message);
    });
    console.error(error);
  }

  function evidenceLabel(value) {
    const labels = {
      "production-background": { en: "Production background", zh: "正式工作背景" },
      "public-builds": { en: "Public builds", zh: "公開實作" },
      "private-implementation": { en: "Private implementation", zh: "私有實作" },
      "deterministic-reference": { en: "Deterministic reference", zh: "可重複參考" },
    };
    return labels[value] || { en: "Evidence available", zh: "已有證據" };
  }

  function setLanguage(language, persist) {
    const next = language === "zh-Hant" ? "zh-Hant" : "en";
    root.dataset.lang = next;
    root.lang = next;

    languageButton?.setAttribute("aria-pressed", String(next === "zh-Hant"));
    languageButton?.setAttribute("aria-label", next === "zh-Hant" ? "Switch to English" : "切換為繁體中文");

    if (indexButton) {
      indexButton.setAttribute(
        "aria-label",
        next === "zh-Hant"
          ? (indexIsOpen ? "關閉頁面索引" : "開啟頁面索引")
          : (indexIsOpen ? "Close page index" : "Open page index"),
      );
    }

    const section = document.getElementById(activeSectionId);
    if (currentSection && section) {
      currentSection.textContent = next === "zh-Hant"
        ? section.dataset.sectionNameZh || "總覽"
        : section.dataset.sectionNameEn || "Overview";
    }

    if (persist) safeStorageSet("portfolio-language", next);
  }

  function setVideoPreference() {
    if (!video) return;
    const saveData = navigator.connection?.saveData === true;

    if (reduceMotion.matches || saveData) {
      video.pause();
      video.removeAttribute("autoplay");
    } else {
      video.setAttribute("autoplay", "");
      video.play()?.catch?.(() => {});
    }
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

  function localized(english, chinese) {
    return root.dataset.lang === "zh-Hant" ? chinese : english;
  }

  function safeStorageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage is optional.
    }
  }
})();
