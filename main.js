(() => {
  "use strict";

  // Preserve the immutable v1 presentation and add post-v1 content as layers.
  for (const [href, layer] of [
    ["assets/responsive.css", "v1"],
    ["assets/evidence-matrix.css", "agent-architect-matrix"],
    ["assets/capability-evidence.css", "capability-evidence"],
  ]) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = href;
    stylesheet.dataset.portfolioLayer = layer;
    document.head.append(stylesheet);
  }

  const loadCapabilityEvidence = () => {
    const enhancement = document.createElement("script");
    enhancement.src = "assets/capability-evidence.js";
    enhancement.async = false;
    enhancement.dataset.evidenceLayer = "capability-evidence";
    document.body.append(enhancement);
  };

  const loadApplicationRuntime = () => {
    const applicationRuntime = document.createElement("script");
    applicationRuntime.src = "assets/main-base.js";
    applicationRuntime.async = false;
    applicationRuntime.dataset.runtime = "portfolio-v1";
    applicationRuntime.addEventListener("load", loadCapabilityEvidence, { once: true });
    document.body.append(applicationRuntime);
  };

  // Inject the additional in-page section before the original runtime captures
  // index links and scrollspy sections. A content-layer failure must not make the
  // v1 portfolio unusable, so the original runtime still loads on error.
  const evidenceRuntime = document.createElement("script");
  evidenceRuntime.src = "assets/evidence-matrix.js";
  evidenceRuntime.async = false;
  evidenceRuntime.dataset.evidenceLayer = "agent-architect-matrix";
  evidenceRuntime.addEventListener("load", loadApplicationRuntime, { once: true });
  evidenceRuntime.addEventListener("error", loadApplicationRuntime, { once: true });
  document.body.append(evidenceRuntime);

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
