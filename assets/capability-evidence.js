(() => {
  "use strict";

  const container = document.getElementById("capability-list");
  if (!container) return;

  let enriched = false;
  const observer = new MutationObserver(() => enrich());
  observer.observe(container, { childList: true });
  enrich();

  async function enrich() {
    if (enriched || !container.querySelector(".capability-row")) return;
    try {
      const response = await fetch("data/portfolio.json", { cache: "no-cache" });
      if (!response.ok) return;
      const data = await response.json();
      const rows = [...container.querySelectorAll(".capability-row")];
      if (rows.length !== data.capabilities?.length) return;

      rows.forEach((row, index) => {
        const capability = data.capabilities[index];
        const badge = row.querySelector(".evidence-state");
        const enBadge = badge?.querySelector('[lang="en"]');
        const zhBadge = badge?.querySelector('[lang="zh-Hant"]');
        const labels = evidenceSource(capability.evidence);
        if (enBadge) enBadge.textContent = labels.en;
        if (zhBadge) zhBadge.textContent = labels.zh;

        if (!row.querySelector(".capability-next-proof") && capability.nextProof) {
          const next = document.createElement("p");
          next.className = "capability-next-proof";
          next.innerHTML = `<strong><span lang="en">Next proof</span><span lang="zh-Hant">下一個證明</span></strong><span lang="en"></span><span lang="zh-Hant"></span>`;
          next.querySelector('[lang="en"]:last-child').textContent = capability.nextProof.en || "";
          next.querySelector('[lang="zh-Hant"]:last-child').textContent = capability.nextProof["zh-Hant"] || capability.nextProof.en || "";
          row.querySelector("p")?.insertAdjacentElement("afterend", next);
        }
      });

      enriched = true;
      observer.disconnect();
    } catch {
      // The original portfolio remains usable if enhancement data is unavailable.
    }
  }

  function evidenceSource(value) {
    if (value === "production-background") return { en: "Production background", zh: "正式工作背景" };
    if (value === "private-implementation") return { en: "Private implementation", zh: "私有實作" };
    return { en: "Public implementation", zh: "公開實作" };
  }
})();
