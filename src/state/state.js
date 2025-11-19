import { PROPERTIES } from "../props/properties.js";

export function createDefaultStep(name, index) {
  const from = {};
  const to = {};

  for (const id in PROPERTIES) {
    const def = PROPERTIES[id];
    from[id] = def.defaultFrom;
    to[id] = def.defaultTo;
  }

  return {
    id: `step-${index}`,
    name: name || `Step ${index}`,
    duration: 800,
    easing: "ease-in-out",
    from,
    to
  };
}

export const state = {
  steps: [createDefaultStep("Step 1", 1)],
  currentStepIndex: 0
};

export function getCurrentStep() {
  return state.steps[state.currentStepIndex];
}

export function addStep() {
  const index = state.steps.length + 1;
  const newStep = createDefaultStep(`Step ${index}`, index);
  state.steps.push(newStep);
  state.currentStepIndex = state.steps.length - 1;
  return newStep;
}

export function setCurrentStepIndex(index) {
  if (index >= 0 && index < state.steps.length) {
    state.currentStepIndex = index;
  }
}

export function deleteStep(index) {
  if (state.steps.length <= 1) return; // prevent deleting last step

  state.steps.splice(index, 1);

  // Fix current index
  if (state.currentStepIndex >= state.steps.length) {
    state.currentStepIndex = state.steps.length - 1;
  }
}