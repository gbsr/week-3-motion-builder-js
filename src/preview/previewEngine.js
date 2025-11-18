import { getCurrentStep } from "../state/state.js";
import { PROPERTIES } from "../props/properties.js";

function buildTransform(values) {
  const x = values.x ?? 0;
  const y = values.y ?? 0;
  const scale = values.scale ?? 1;
  return `translate(${x}px, ${y}px) scale(${scale})`;
}

function buildKeyframesFromStep(step) {
  const fromKeyframe = {};
  const toKeyframe = {};

  // non-transform props
  for (const propId in step.from) {
    const def = PROPERTIES[propId];
    const fromVal = step.from[propId];
    const toVal = step.to[propId];

    if (def.appliesTo === "transform") continue;

    const suffix = def.unit || "";
    fromKeyframe[def.appliesTo] = `${fromVal}${suffix}`;
    toKeyframe[def.appliesTo] = `${toVal}${suffix}`;
  }

  // transform from x/y/scale
  fromKeyframe.transform = buildTransform(step.from);
  toKeyframe.transform = buildTransform(step.to);

  return [fromKeyframe, toKeyframe];
}

export function playCurrentStep() {
  const step = getCurrentStep();
  const el = document.getElementById("element-to-animate");
  if (!el) return;

  const [fromKF, toKF] = buildKeyframesFromStep(step);

  el.animate([fromKF, toKF], {
    duration: step.duration,
    easing: step.easing,
    fill: "forwards"
  });
}