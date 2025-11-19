import { getCurrentStep } from "../state/state.js";
import { PROPERTIES } from "../props/properties.js";
import { state } from "../state/state.js";

export function playCurrentStep() {
  const step = getCurrentStep();
  const el = document.getElementById("element-to-animate");
  if (!el || !step) return;

  // Cancel any running animations to keep preview clean
  if (el.getAnimations) {
    el.getAnimations().forEach((a) => a.cancel());
  }

  const [fromKeyframe, toKeyframe] = buildKeyframesFromStep(step);

  el.animate([fromKeyframe, toKeyframe], {
    duration: step.duration,
    easing: step.easing,
    fill: "forwards"
  });
}


//  Turn a step into two Web Animations keyframes: [from, to]
 
export function buildKeyframesFromStep(step) {
  const fromFrame = buildFrame(step.from);
  const toFrame = buildFrame(step.to);
  return [fromFrame, toFrame];
}


//  Build a single keyframe object from a value map (step.from or step.to).
//  All routing is driven by PROPERTIES + appliesTo.
 
function buildFrame(values) {
  const frame = {};
  const transformPieces = [];

  for (const id in PROPERTIES) {
    const def = PROPERTIES[id];
    const value = values[id] ?? def.defaultFrom;
    const unit = def.unit ?? "";
    const appliesTo = def.appliesTo;

    if (!appliesTo) continue;

    const parts = appliesTo.split(".");
    const target = parts[0];                // "transform" or "style" (or other)
    const propName = parts[parts.length-1]; // e.g. "translateX", "opacity"

    // handle transform properties separately
    // → "transform" === target → build translateX(…), scale(…), rotate(…), etc.
    if (target === "transform") {
      const arg = unit ? `${value}${unit}` : value;
      transformPieces.push(`${propName}(${arg})`);
    } else {
      // last segment becomes the CSS property name on the frame
      // → "style" === target → set frame.opacity, frame.borderRadius, etc.
      frame[propName] = unit ? `${value}${unit}` : value;
    }
  }

  if (transformPieces.length > 0) {
    frame.transform = transformPieces.join(" ");
  }

  return frame;
}

export function playTimeline() {
  const el = document.getElementById("element-to-animate");
  if (!el || state.steps.length === 0) return;

  // cancel any running animations before starting the sequence
  if (el.getAnimations) {
    el.getAnimations().forEach((a) => a.cancel());
  }

  let index = 0;

  function runNext() {
    if (index >= state.steps.length) return;

    const step = state.steps[index];
    const [fromKeyframe, toKeyframe] = buildKeyframesFromStep(step);

    const animation = el.animate([fromKeyframe, toKeyframe], {
      duration: step.duration,
      easing: step.easing,
      fill: index === state.steps.length - 1 
      ? "forwards" // final step → freeze the end result
      : "none"     // intermediate steps → don't freeze end state
    });

    index += 1;
    animation.onfinish = runNext;
  }

  runNext();
}