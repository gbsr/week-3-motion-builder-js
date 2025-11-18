import { getCurrentStep, addStep } from "./state/state.js";
import { renderEditorPanel, renderTimingControls } from "./ui/editorPanel.js";
import { playCurrentStep } from "./preview/previewEngine.js";

window.addEventListener("DOMContentLoaded", () => {
  const step = getCurrentStep();
  renderTimingControls(step);
  renderEditorPanel(step);

  // Preview hover
  const previewBox = document.getElementById("element-to-animate");
  console.log("previewBox:", previewBox);
  if (previewBox) {
    previewBox.addEventListener("mouseenter", () => {
      playCurrentStep();
    });
  } else {
    console.warn("No #element-to-animate found in DOM");
  }

  // Add step button
  const addStepButton = document.getElementById("add-step-button");
  console.log("addStepButton:", addStepButton);
  if (addStepButton) {
    addStepButton.addEventListener("click", () => {
      const newStep = addStep();
      renderTimingControls(newStep);
      renderEditorPanel(newStep);
    });
  } else {
    console.warn("No #add-step-button found in DOM");
  }

  // Play button
  const playButton = document.getElementById("play-button");
  console.log("playButton:", playButton);
  if (playButton) {
    playButton.addEventListener("click", () => {
      playCurrentStep();
    });
  } else {
    console.warn("No #play-button found in DOM");
  }

  console.log("Initialization complete.");
});