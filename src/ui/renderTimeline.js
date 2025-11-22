// src/ui/renderTimeline.js
import { state, getCurrentStep, setCurrentStepIndex } from "../state/state.js";
import { renderEditorPanel, renderTimingControls, renderAnimationSettings } from "../ui/editorPanel.js";
import { PROPERTIES } from "../props/properties.js";

export function renderTimeline() {
  const stepsContainer = document.getElementById("steps-container");
  const timeControls = document.getElementById("timing-controls");
  const settingsContainer = document.getElementById("animation-settings");
  if (!stepsContainer || !timeControls || !settingsContainer) return;

  // render GLOBAL animation settings once, above the buttons
  renderAnimationSettings(settingsContainer);

  stepsContainer.innerHTML = "";

  state.steps.forEach((step, index) => {
    const header = document.createElement("button");
    header.className = "step-header";
    if (index === state.currentStepIndex) header.classList.add("active");

    const chevron = index === state.currentStepIndex ? "▾" : "▸";

    // render property summary for this step
    const activePropIds =
      step.activeProps && step.activeProps.length ? step.activeProps : [];

    // Build property summary: "X position (0→150), Scale (1→2)"
    let summary = "";
    if (activePropIds.length > 0) {
      const labelList = activePropIds.map((id) => {
        const def = PROPERTIES[id];
        if (!def) return id;

        const fromVal = step.from[id] ?? def.defaultFrom;
        const toVal = step.to[id] ?? def.defaultTo;

        return `${def.label} (${fromVal}→${toVal})`;
      });

      summary = " - " + labelList.join(", ");
    }

    header.textContent = `${chevron} Step ${index + 1} properties:${summary}`;

    header.addEventListener("click", () => {
      setCurrentStepIndex(index);
      renderTimeline(); // rebuild to active step
    });

    stepsContainer.appendChild(header);
  });

  // active step controls
  let details = timeControls.querySelector(".step-details");
  if (!details) {
    details = document.createElement("div");
    details.className = "step-details";
    timeControls.appendChild(details);
  }

  details.innerHTML = "";
  const current = getCurrentStep();
  renderTimingControls(current, details);

  // Pass the active header to editor panel, so it can update summary live
  const activeHeader = stepsContainer.querySelector(".step-header.active");
  renderEditorPanel(current, details, activeHeader);
}