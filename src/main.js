// src/main.js
import { addStep, deleteStep, state } from "./state/state.js";
import { renderTimeline } from "./ui/renderTimeline.js";
import { playCurrentStep, playTimeline } from "./preview/previewEngine.js";
import { generateCodeFromTimeline } from "./ui/codeOutput.js";

window.addEventListener("DOMContentLoaded", () => {
  renderTimeline();
  const generatedCode = document.getElementById("generated-code");

  // Populate global add-property dropdown
  const selectGlobal = document.getElementById("global-add-property-select");
  Object.entries(PROPERTIES).forEach(([id, def]) => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = def.label;
    selectGlobal.appendChild(opt);
  });

  // Add selected property to current step
  document.getElementById("global-add-property-button")
    .addEventListener("click", () => {
      const step = state.steps[state.currentStepIndex];
      const id = selectGlobal.value;
      if (!id) return;

      if (!step.activeProps) step.activeProps = [];

      if (!step.activeProps.includes(id)) {
        step.activeProps.push(id);
        const def = PROPERTIES[id];
        step.from[id] = def.defaultFrom;
        step.to[id] = def.defaultTo;
      }

      renderTimeline();
  });
  
  // Preview hover
  const previewBox = document.getElementById("element-to-animate");
  if (previewBox) {
    previewBox.addEventListener("mouseenter", () => {
      playCurrentStep();
    });
  } else {
    console.warn("No #element-to-animate found in DOM");
  }

  // Add step button
  const addStepButton = document.getElementById("add-step-button");
  if (addStepButton) {
    addStepButton.addEventListener("click", () => {
      addStep(); 
      renderTimeline(); // rebuild timeline UI
    });
  }

  // Delete selected step
  const deleteStepButton = document.getElementById("delete-step-button");
  if (deleteStepButton) {
    deleteStepButton.addEventListener("click", () => {
      deleteStep(state.currentStepIndex);
      renderTimeline();
    });
  }


  // Play button
  const playButton = document.getElementById("play-button");
  if (playButton) {
    playButton.addEventListener("click", () => {
      playTimeline();
      generateCodeFromTimeline(generatedCode);
    });
  }

  console.log("Initialization complete.");
});

// Description toggle
const descToggle = document.getElementById("description-toggle");
const descContent = document.getElementById("description-content");

if (descToggle && descContent) {
  descToggle.addEventListener("click", () => {
    const isHidden = descContent.classList.toggle("hidden");
    descToggle.textContent = (isHidden ? "▸" : "▾") + " What is this?";
  });
}