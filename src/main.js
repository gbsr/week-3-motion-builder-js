// src/main.js
import { addStep, deleteStep, state } from "./state/state.js";
import { renderTimeline } from "./ui/renderTimeline.js";
import { playCurrentStep, playTimeline } from "./preview/previewEngine.js";
import { generateCodeFromTimeline } from "./ui/codeOutput.js";

window.addEventListener("DOMContentLoaded", () => {
  renderTimeline();
  const generatedCode = document.getElementById("generated-code");
  
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