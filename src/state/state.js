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

export const animationSettings = {
  trigger: "hover",   // "hover" | "click" | "load" | "manual"
  iterations: 1       // number or "infinite"
};

export function setTrigger(trigger) {
  animationSettings.trigger = trigger;
}

export function setIterations(raw) {
  if (raw === "infinite") {
    animationSettings.iterations = "infinite";
    return;
  }

  const n = Number(raw);
  animationSettings.iterations = Number.isFinite(n) && n > 0 ? n : 1;
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