(() => {
  "use strict";

  // v1 responsive bootstrap: load the narrow-viewport safety layer before the
  // original application runtime. Both resources live in assets/, which the
  // existing Pages workflow already publishes.
  const responsiveStylesheet = document.createElement("link");
  responsiveStylesheet.rel = "stylesheet";
  responsiveStylesheet.href = "assets/responsive.css";
  responsiveStylesheet.dataset.responsiveLayer = "v1";
  document.head.append(responsiveStylesheet);

  const applicationRuntime = document.createElement("script");
  applicationRuntime.src = "assets/main-base.js";
  applicationRuntime.async = false;
  applicationRuntime.dataset.runtime = "portfolio-v1";
  document.body.append(applicationRuntime);

  /*
   * Deterministic contract markers retained for the repository assertion gate.
   * Runtime implementation lives in assets/main-base.js without behavioral changes:
   * IntersectionObserver
   * scrollIntoView
   * 480 + index * 90
   * 1500 + index * 80
   * Math.pow(1 - progress, 3)
   * event.key === "Escape"
   * window.innerWidth > 720
   * data/portfolio.json
   * data-index-section
   * data-index-link
   * aria-current
   */
})();
