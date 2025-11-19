// src/ui/renderTimeline.js
import { state, getCurrentStep, setCurrentStepIndex } from "../state/state.js";
import { renderEditorPanel, renderTimingControls } from "../ui/editorPanel.js";

export function renderTimeline() {
  const stepsContainer = document.getElementById("steps-container");
  const timeControls = document.getElementById("timing-controls");
  if (!stepsContainer || !timeControls) return;

  stepsContainer.innerHTML = "";

  state.steps.forEach((step, index) => {
    const header = document.createElement("button");
    header.className = "step-header";
    if (index === state.currentStepIndex) header.classList.add("active");

    const chevron = index === state.currentStepIndex ? "▾" : "▸";
    header.textContent = `${chevron} Step ${index + 1} properties:`;

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

  // timing + editor panel for current step
  details.innerHTML = "";
  const current = getCurrentStep();
  renderTimingControls(current, details);
  renderEditorPanel(current, details);
}