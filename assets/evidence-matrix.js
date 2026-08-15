(() => {
  "use strict";

  const capabilities = document.getElementById("capabilities");
  const projects = document.getElementById("projects");
  if (!capabilities || !projects || document.getElementById("evaluation")) return;

  const section = document.createElement("section");
  section.className = "article-section evaluation-section";
  section.id = "evaluation";
  section.dataset.indexSection = "";
  section.dataset.sectionNameEn = "Evaluation";
  section.dataset.sectionNameZh = "量測方式";
  section.setAttribute("aria-labelledby", "evaluation-title");

  section.innerHTML = `
    <div class="article-layout">
      <header class="section-rail reveal-on-scroll is-visible">
        <span class="section-number">A1</span>
        <p class="section-kicker"><span lang="en">Evidence, not completion percentages</span><span lang="zh-Hant">用證據，不用完成百分比</span></p>
        <h2 id="evaluation-title" tabindex="-1">
          <span lang="en">Define one measurable outcome before the Agent changes code.</span>
          <span lang="zh-Hant">Agent 改 Code 前，先定義一個可量測成果。</span>
        </h2>
      </header>

      <div class="article-body reveal-on-scroll is-visible">
        <p class="article-lead">
          <span lang="en">My work connects mobile systems, full-stack delivery, and software Agents. I enter an existing codebase, define one clear result, deliver reviewable pull requests, and leave executable team knowledge behind.</span>
          <span lang="zh-Hant">我的工作把行動系統、全端交付與軟體 Agent 連在一起。我加入既有 Codebase，先定義一個清楚成果，再交付可審查的 Pull Request，並留下可執行的團隊知識。</span>
        </p>

        <div class="outcome-contract" aria-label="Outcome contract">
          <article>
            <span>01</span>
            <h3><span lang="en">Baseline</span><span lang="zh-Hant">Baseline｜現在在哪裡</span></h3>
            <p><span lang="en">Record the current behavior, failure, cost, latency, tests, and evidence before changing it.</span><span lang="zh-Hant">修改前先記錄現在的行為、失敗、成本、延遲、測試與證據。</span></p>
          </article>
          <article>
            <span>02</span>
            <h3><span lang="en">Candidate</span><span lang="zh-Hant">Candidate｜這次改什麼</span></h3>
            <p><span lang="en">Name the smallest reviewable change and the exact state it is expected to establish.</span><span lang="zh-Hant">說清楚最小可審查變更，以及它應該建立的精確狀態。</span></p>
          </article>
          <article>
            <span>03</span>
            <h3><span lang="en">Gate</span><span lang="zh-Hant">Gate｜怎樣才算完成</span></h3>
            <p><span lang="en">Write the checks and budgets that must pass. A good-looking answer is not an acceptance condition.</span><span lang="zh-Hant">先寫下必須通過的檢查與預算。看起來很好的答案不是驗收條件。</span></p>
          </article>
        </div>

        <div class="execution-rule">
          <blockquote>
            <span lang="en">An LLM can propose a good answer. Software delivery needs a stronger rule: execute the result, read the deterministic failure, repair the exact condition, then rerun until the agreed checks pass.</span>
            <span lang="zh-Hant">LLM 可以提出好答案，但軟體交付需要更強的規則：執行結果、讀取確定性失敗、修正精確條件，再重跑到約定檢查通過。</span>
          </blockquote>
          <ol>
            <li><span lang="en">Execute the smallest useful change.</span><span lang="zh-Hant">執行最小可用變更。</span></li>
            <li><span lang="en">Read the exact failing assertion, exit code, schema, or trace.</span><span lang="zh-Hant">讀取精確失敗：Assertion、Exit Code、Schema 或 Trace。</span></li>
            <li><span lang="en">Repair the condition that failed, not unrelated code.</span><span lang="zh-Hant">只修正失敗條件，不順手重寫無關程式。</span></li>
            <li><span lang="en">Rerun and publish the evidence with the pull request.</span><span lang="zh-Hant">重跑，並把證據和 Pull Request 一起交付。</span></li>
          </ol>
        </div>

        <div class="method-article__heading">
          <span><span lang="en">Weighted evaluation matrix</span><span lang="zh-Hant">PDF 量測矩陣</span></span>
          <h3><span lang="en">The percentages are rubric weights, not my personal completion score.</span><span lang="zh-Hant">這些百分比是評分權重，不是我的能力完成度。</span></h3>
        </div>

        <div class="architect-scorecard" aria-label="Agent architecture evaluation weights">
          <article class="score-row">
            <strong class="score-weight">25%</strong>
            <div class="score-copy"><h3><span lang="en">Control flow & state governance</span><span lang="zh-Hant">控制流與狀態治理</span></h3><p><span lang="en">Look for DAG/state-machine ownership, Plan → Execute → Verify separation, termination conditions, and bounded steps.</span><span lang="zh-Hant">看 DAG／狀態機、Plan → Execute → Verify 分離、終止條件與最大步數是否由系統控制。</span></p></div>
            <p class="score-gate"><span lang="en">Measure from executable state transitions and failure paths, not from prompt prose.</span><span lang="zh-Hant">用可執行狀態轉移與失敗路徑評分，不用 Prompt 寫得多漂亮來評分。</span></p>
          </article>
          <article class="score-row">
            <strong class="score-weight">20%</strong>
            <div class="score-copy"><h3><span lang="en">Tool boundaries & idempotency</span><span lang="zh-Hant">工具邊界與冪等性</span></h3><p><span lang="en">Check single-purpose tools, typed schemas, write protection, idempotency keys, and reduced tool payloads.</span><span lang="zh-Hant">檢查單一職責 Tool、型別 Schema、寫入保護、Idempotency Key 與精簡回傳資料。</span></p></div>
            <p class="score-gate"><span lang="en">High-risk writes must be blocked by deterministic policy, not model confidence alone.</span><span lang="zh-Hant">高風險寫入必須由確定性 Policy 阻擋，不能只相信模型信心度。</span></p>
          </article>
          <article class="score-row">
            <strong class="score-weight">20%</strong>
            <div class="score-copy"><h3><span lang="en">Context budget & memory</span><span lang="zh-Hant">上下文預算與記憶</span></h3><p><span lang="en">Measure pruning, structured extraction, short-lived scratch state, durable state, and explicit token budgets.</span><span lang="zh-Hant">量測 Pruning、結構化提取、短期工作記憶、持久狀態與明確 Token Budget。</span></p></div>
            <p class="score-gate"><span lang="en">More context is not automatically better context.</span><span lang="zh-Hant">更多 Context 不等於更好的 Context。</span></p>
          </article>
          <article class="score-row">
            <strong class="score-weight">20%</strong>
            <div class="score-copy"><h3><span lang="en">Fault tolerance, repair & HITL</span><span lang="zh-Hant">容錯、自癒與 HITL</span></h3><p><span lang="en">Check timeouts, bounded retries, circuit breaking, precise repair, compensation, and human gates for risky actions.</span><span lang="zh-Hant">檢查 Timeout、有限重試、Circuit Breaker、精確修復、補償流程與高風險 Human Gate。</span></p></div>
            <p class="score-gate"><span lang="en">A retry loop without a stop condition is not self-healing.</span><span lang="zh-Hant">沒有停止條件的重試迴圈，不算 Self-healing。</span></p>
          </article>
          <article class="score-row">
            <strong class="score-weight">15%</strong>
            <div class="score-copy"><h3><span lang="en">Evals & observability</span><span lang="zh-Hant">Evals 與可觀測性</span></h3><p><span lang="en">Require deterministic assertions, a Golden Dataset where appropriate, semantic judging where needed, and traces for tools, tokens, latency, and decisions.</span><span lang="zh-Hant">要求確定性 Assertions、適用時的 Golden Dataset、需要時的語意 Judge，以及 Tool、Token、Latency、Decision Trace。</span></p></div>
            <p class="score-gate"><span lang="en">A release should explain what was measured and what remains unproven.</span><span lang="zh-Hant">每次 Release 都應說明量到了什麼，以及什麼仍未被證明。</span></p>
          </article>
        </div>

        <p class="score-note">
          <span lang="en">Example gates from the supplied evaluation framework: Safety/Guardrail = 100%; Golden-set accuracy must not regress; semantic-judge delta ≥ -0.02; average token growth ≤ +15%; P95 latency growth ≤ +20%. These are acceptance examples for a measured task, not claims about this résumé.</span>
          <span lang="zh-Hant">PDF 的範例 Gate：Safety／Guardrail = 100%；Golden Set Accuracy 不得退步；Semantic Judge Δ ≥ -0.02；平均 Token 增幅 ≤ +15%；P95 Latency 增幅 ≤ +20%。這些是「任務驗收」的量測範例，不是這份履歷的自評分數。</span>
        </p>

        <div class="method-article__heading">
          <span><span lang="en">Vibe Coding → Agentic Architect</span><span lang="zh-Hant">Vibe Coding → Agentic Architect</span></span>
          <h3><span lang="en">The difference is who owns uncertainty.</span><span lang="zh-Hant">差別在於：誰負責管理不確定性。</span></h3>
        </div>

        <div class="vibe-compare" role="table" aria-label="Vibe Coding versus Agentic Architect">
          <div class="vibe-compare__head"><span lang="en">Dimension</span><span lang="zh-Hant">面向</span></div><div class="vibe-compare__head">Vibe Coding</div><div class="vibe-compare__head">Agentic Architect</div>
          <div class="vibe-compare__dimension"><span lang="en">Boundaries</span><span lang="zh-Hant">邊界</span></div><div class="vibe-compare__weak"><span lang="en">Lets the model decide most behavior.</span><span lang="zh-Hant">大部分行為交給模型自己決定。</span></div><div class="vibe-compare__strong"><span lang="en">Keeps safety, permissions, budgets, and critical writes in deterministic code.</span><span lang="zh-Hant">把安全、權限、預算與關鍵寫入留在確定性 Code。</span></div>
          <div class="vibe-compare__dimension"><span lang="en">Context</span><span lang="zh-Hant">Context</span></div><div class="vibe-compare__weak"><span lang="en">Keeps adding history to a larger prompt.</span><span lang="zh-Hant">持續把歷史紀錄塞進更大的 Prompt。</span></div><div class="vibe-compare__strong"><span lang="en">Budgets, prunes, extracts structured state, and separates working memory from durable state.</span><span lang="zh-Hant">做 Budget、Pruning、結構化 State，並分開工作記憶與持久狀態。</span></div>
          <div class="vibe-compare__dimension"><span lang="en">Task control</span><span lang="zh-Hant">任務控制</span></div><div class="vibe-compare__weak"><span lang="en">One long ReAct loop or giant prompt.</span><span lang="zh-Hant">一條很長的 ReAct Loop 或巨型 Prompt。</span></div><div class="vibe-compare__strong"><span lang="en">DAG/state machine with explicit plan, execution, verification, rollback, and stop conditions.</span><span lang="zh-Hant">DAG／狀態機，明確分開規劃、執行、驗證、回滾與停止條件。</span></div>
          <div class="vibe-compare__dimension"><span lang="en">Multiple Agents</span><span lang="zh-Hant">多 Agent</span></div><div class="vibe-compare__weak"><span lang="en">Agents chat until they appear to agree.</span><span lang="zh-Hant">多個 Agent 對話到看起來達成共識。</span></div><div class="vibe-compare__strong"><span lang="en">Single responsibilities, typed handoffs, bounded workers, and explicit arbitration.</span><span lang="zh-Hant">單一職責、Typed Handoff、有限 Worker 與明確仲裁。</span></div>
          <div class="vibe-compare__dimension"><span lang="en">Verification</span><span lang="zh-Hant">驗證</span></div><div class="vibe-compare__weak"><span lang="en">“It worked a few times.”</span><span lang="zh-Hant">「我跑幾次看起來可以。」</span></div><div class="vibe-compare__strong"><span lang="en">Assertions, Evals, traces, regression diffs, and evidence that can go red.</span><span lang="zh-Hant">Assertions、Evals、Trace、Regression Diff，以及真的能變紅的證據。</span></div>
        </div>

        <div class="delivery-models">
          <article>
            <span class="model-label">DROP-IN REMOTE AGENT</span>
            <h3><span lang="en">Join the codebase without becoming permanent process overhead.</span><span lang="zh-Hant">進入既有 Codebase，但不增加長期駐點負擔。</span></h3>
            <p><span lang="en">A bounded remote engagement: read the repository contract, define one measurable outcome, make the smallest useful changes, run the checks, publish evidence, and hand back executable knowledge so the team can repeat the work asynchronously.</span><span lang="zh-Hant">這是一種有邊界的遠端合作：讀懂 Repo 契約、定義一個可量測成果、完成最小有效變更、跑完檢查、留下證據，再把可執行知識交回團隊，讓後續能非同步重播。</span></p>
          </article>
          <article>
            <span class="model-label">GIT TOWN STACK PRS</span>
            <h3><span lang="en">One outcome, several reviewable slices.</span><span lang="zh-Hant">一個成果，拆成多個可審查切片。</span></h3>
            <p><span lang="en">Instead of one giant PR, dependent changes are stacked in review order. Each branch owns one small responsibility, carries its tests and evidence, and can be traced to the larger outcome. Independent work stays independent rather than being forced into a stack.</span><span lang="zh-Hant">不是一次送出巨大 PR，而是把有依賴關係的變更依審查順序堆疊。每個 Branch 只負責一個小責任，帶著自己的測試與證據，也能追溯到整體成果；沒有依賴的工作就保持獨立，不硬塞進 Stack。</span></p>
            <div class="stack-flow" aria-label="Stacked pull request example"><span>outcome/spec</span><i>→</i><span>contract</span><i>→</i><span>runtime</span><i>→</i><span>evals</span><i>→</i><span>docs + handoff</span></div>
          </article>
        </div>

        <div class="method-article__heading">
          <span><span lang="en">Repository evidence</span><span lang="zh-Hant">Repository 實作證據</span></span>
          <h3><span lang="en">Claims stay attached to the repositories that can support them.</span><span lang="zh-Hant">能力主張要連回能支撐它的 Repository。</span></h3>
        </div>

        <div class="repo-evidence-grid">
          <article>
            <span class="evidence-source"><span lang="en">PUBLIC IMPLEMENTATION</span><span lang="zh-Hant">公開實作</span></span>
            <h3>Skill.md-native</h3>
            <p><span lang="en">Executable capability audits, code/assertion loops, Browser runtime evidence, hardened-container checks, immutable evidence packets, and explicit non-claims for work that has not reached live proof.</span><span lang="zh-Hant">可執行能力審計、Code／Assertion Loop、Browser Runtime 證據、Hardened Container 檢查、不可變證據包，以及對尚未取得 Live Proof 的能力明確不宣稱。</span></p>
            <div class="repo-links"><a href="https://github.com/ed3c/Skill.md-native" target="_blank" rel="noopener noreferrer">Repository ↗</a></div>
          </article>
          <article>
            <span class="evidence-source"><span lang="en">PRIVATE IMPLEMENTATION</span><span lang="zh-Hant">私有實作</span></span>
            <h3>agent-shield-monorepo</h3>
            <p><span lang="en">Private evidence for state-machine control, receipt-derived status, Git Town delivery checks, origin-verification contracts, and bounded Claude/Codex consumer canaries. Public copy deliberately omits private adapters, credentials, and internal bindings.</span><span lang="zh-Hant">私有實作證據包含狀態機控制、由 Receipt 推導狀態、Git Town 交付檢查、Origin Verification Contract，以及有邊界的 Claude／Codex Consumer Canary。公開履歷刻意不揭露私有 Adapter、Credential 與內部 Binding。</span></p>
            <span class="private-evidence"><span lang="en">Private repository link withheld from the public résumé.</span><span lang="zh-Hant">公開履歷不提供私有 Repository 連結。</span></span>
          </article>
          <article>
            <span class="evidence-source"><span lang="en">PUBLIC IMPLEMENTATION</span><span lang="zh-Hant">公開實作</span></span>
            <h3>truth-verify-loop</h3>
            <p><span lang="en">Independent semantic admission, deterministic core and shell contracts, provider timeouts, replayable delivery receipts, and explicit evidence boundaries.</span><span lang="zh-Hant">Independent Semantic Admission、確定性 Core／Shell Contract、Provider Timeout、可重播 Delivery Receipt 與明確 Evidence Boundary。</span></p>
            <div class="repo-links"><a href="https://github.com/ed3c/truth-verify-loop" target="_blank" rel="noopener noreferrer">Repository ↗</a></div>
          </article>
          <article>
            <span class="evidence-source"><span lang="en">PUBLIC IMPLEMENTATION</span><span lang="zh-Hant">公開實作</span></span>
            <h3>agent-skills-repo</h3>
            <p><span lang="en">Portable Skill contracts, deterministic repository gates, qualification state separation, Arena preregistration, and evidence that explicitly refuses to turn an unrun experiment into a success claim.</span><span lang="zh-Hant">Portable Skill Contract、確定性 Repo Gate、Qualification 狀態分離、Arena Preregistration，以及明確拒絕把未執行實驗寫成成功的證據系統。</span></p>
            <div class="repo-links"><a href="https://github.com/ed3c/agent-skills-repo" target="_blank" rel="noopener noreferrer">Repository ↗</a></div>
          </article>
          <article>
            <span class="evidence-source"><span lang="en">PUBLIC IMPLEMENTATION</span><span lang="zh-Hant">公開實作</span></span>
            <h3>openwiki-source-anchoring</h3>
            <p><span lang="en">Executable evaluation contracts, fail-closed manifest validation, deterministic reproduction, negative controls, and separation between synthetic infrastructure tests and real research results.</span><span lang="zh-Hant">可執行 Evaluation Contract、Fail-closed Manifest 驗證、Deterministic Reproduction、Negative Controls，以及把 Synthetic Infrastructure Test 與真實研究結果明確分開。</span></p>
            <div class="repo-links"><a href="https://github.com/ed3c/openwiki-source-anchoring" target="_blank" rel="noopener noreferrer">Repository ↗</a></div>
          </article>
          <article>
            <span class="evidence-source"><span lang="en">PUBLIC IMPLEMENTATION + NEXT PROOF</span><span lang="zh-Hant">公開實作＋下一個證明</span></span>
            <h3>XT-Aegis / post-training-rsi-pipeline</h3>
            <p><span lang="en">These repositories demonstrate fail-closed safety gates, Git Town checks, provider preflight, recovery planning, and explicit unproven states. Remaining live-runtime, provider, or production gates stay visible instead of being converted into a completion percentage.</span><span lang="zh-Hant">這些 Repo 展示 Fail-closed Safety Gate、Git Town 檢查、Provider Preflight、Recovery Planning 與明確未證明狀態；尚缺的 Live Runtime、Provider 或 Production Gate 保持可見，不換算成漂亮的完成百分比。</span></p>
            <div class="repo-links"><a href="https://github.com/ed3c/XT-Aegis" target="_blank" rel="noopener noreferrer">XT-Aegis ↗</a><a href="https://github.com/ed3c/post-training-rsi-pipeline" target="_blank" rel="noopener noreferrer">RSI pipeline ↗</a></div>
          </article>
        </div>
      </div>
    </div>`;

  projects.parentNode.insertBefore(section, projects);

  const capabilityIndexLink = document.querySelector('.index-list a[href="#capabilities"]');
  if (capabilityIndexLink) {
    const link = document.createElement("a");
    link.href = "#evaluation";
    link.dataset.indexLink = "";
    link.innerHTML = '<span>A1</span><b><span lang="en">Evaluation</span><span lang="zh-Hant">量測方式</span></b>';
    capabilityIndexLink.insertAdjacentElement("afterend", link);
  }
})();
