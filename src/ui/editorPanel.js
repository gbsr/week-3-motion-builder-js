import { PROPERTIES } from "../props/properties.js";
import { animationSettings, setTrigger, setIterations } from "../state/state.js";

export function renderEditorPanel(step, parent) {
  // reuse a single panel element under this parent
  let panel = parent.querySelector(".editor-panel-content");
  if (!panel) {
    panel = document.createElement("div");
    panel.className = "editor-panel-content";
    parent.appendChild(panel);
  }

  panel.innerHTML = "";

  // helper: keep the active step header summary (X position (0→150), …) in sync
  function updateHeaderSummary() {
    const header = document.querySelector("#steps-container .step-header.active");
    if (!header) return;

    const base = header.textContent.split(" – ")[0]; // "▾ Step 1 properties:"
    const activePropIds =
      step.activeProps && step.activeProps.length
        ? step.activeProps
        : [];

    if (!activePropIds.length) {
      header.textContent = base;
      return;
    }

    const parts = activePropIds.map((id) => {
      const def = PROPERTIES[id];
      if (!def) return id;

      const fromVal = step.from[id] ?? def.defaultFrom;
      const toVal   = step.to[id]   ?? def.defaultTo;

      return `${def.label} (${fromVal}→${toVal})`;
    });

    header.textContent = `${base} – ${parts.join(", ")}`;
  }

  // use activeProps if present, otherwise fall back to all properties
  const activePropIds =
    step.activeProps && step.activeProps.length
      ? step.activeProps
      : [];

  // render each active property row
  activePropIds.forEach((propId) => {
    const prop = PROPERTIES[propId];
    if (!prop) return;

    const propDiv = document.createElement("div");
    propDiv.className = "property-control";

    const propertyContainer = document.createElement("div");
    propertyContainer.className = "property-container";

    const nameSpan = document.createElement("p");
    nameSpan.className = "ui-control";
    nameSpan.textContent = prop.label;
    propertyContainer.appendChild(nameSpan);

    // delete button for this property
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "prop-delete-button";
    deleteBtn.textContent = "×";
    deleteBtn.title = "Remove this property from the animation";
    deleteBtn.addEventListener("click", () => {
      // remove from active props
      const current = step.activeProps && step.activeProps.length
        ? step.activeProps
        : activePropIds;

      step.activeProps = current.filter((id) => id !== propId);

      // remove stored values to avoid stale data
      delete step.from[propId];
      delete step.to[propId];

      // re-render this panel for the same step
      renderEditorPanel(step, parent);

      updateHeaderSummary();
    });
    propertyContainer.appendChild(deleteBtn);

    propDiv.appendChild(propertyContainer);

    const isColor = prop.type === "color";

    const labelFrom = document.createElement("label");
    labelFrom.textContent = "From:";
    propDiv.appendChild(labelFrom);

    const inputFrom = document.createElement("input");
    inputFrom.type = isColor ? "color" : "number";

    if (!isColor) {
      inputFrom.min = prop.min;
      inputFrom.max = prop.max;
      inputFrom.step = prop.step;
    }

    inputFrom.value =
      step.from[propId] !== undefined ? step.from[propId] : prop.defaultFrom;

    inputFrom.addEventListener("input", () => {
      step.from[propId] = isColor
        ? inputFrom.value       // "#rrggbb"
        : Number(inputFrom.value);
        updateHeaderSummary()
    });
    propDiv.appendChild(inputFrom);

    const labelTo = document.createElement("label");
    labelTo.textContent = "To:";
    propDiv.appendChild(labelTo);

    const inputTo = document.createElement("input");
    inputTo.type = isColor ? "color" : "number";

    if (!isColor) {
      inputTo.min = prop.min;
      inputTo.max = prop.max;
      inputTo.step = prop.step;
    }

    inputTo.value =
      step.to[propId] !== undefined ? step.to[propId] : prop.defaultTo;

    inputTo.addEventListener("input", () => {
      step.to[propId] = isColor
        ? inputTo.value
        : Number(inputTo.value);
      updateHeaderSummary();
    });
    propDiv.appendChild(inputTo);

    panel.appendChild(propDiv);
  });

  // make sure header summary is correct on first render as well
  updateHeaderSummary();
}

export function renderTimingControls(step, parent) {
  const timingPanel = document.createElement("div");
  timingPanel.className = "step-controls";
  parent.appendChild(timingPanel);

  const durationLabel = document.createElement("label");
  durationLabel.textContent = "Duration (ms):";
  timingPanel.appendChild(durationLabel);

  const durationInput = document.createElement("input");
  durationInput.type = "number";
  durationInput.min = 50;
  durationInput.max = 10000;
  durationInput.step = 50;
  durationInput.value = step.duration;
  durationInput.addEventListener("input", () => {
    step.duration = Number(durationInput.value);
  });
  timingPanel.appendChild(durationInput);

  const easingLabel = document.createElement("label");
  easingLabel.textContent = "Easing:";
  timingPanel.appendChild(easingLabel);

  const easingSelect = document.createElement("select");
  ["linear", "ease", "ease-in", "ease-out", "ease-in-out"].forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    if (name === step.easing) opt.selected = true;
    easingSelect.appendChild(opt);
  });
  easingSelect.addEventListener("change", () => {
    step.easing = easingSelect.value;
  });
  timingPanel.appendChild(easingSelect);
}

// iteration and trigger settings
export function renderAnimationSettings(container) {
  container.innerHTML = "";

  // trigger
  const triggerLabel = document.createElement("label");
  triggerLabel.textContent = "Animation Trigger:";
  container.appendChild(triggerLabel);

  const triggerSelect = document.createElement("select");
  ["hover", "click", "load", "manual"].forEach(value => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = {
      hover: "On hover",
      click: "On click",
      load: "On page load",
      manual: "Manual"
    }[value];
    if (value === animationSettings.trigger) opt.selected = true;
    triggerSelect.appendChild(opt);
  });
  triggerSelect.addEventListener("change", () => {
    setTrigger(triggerSelect.value);
  });
  container.appendChild(triggerSelect);

  // iterations
  const iterLabel = document.createElement("label");
  iterLabel.textContent = "Iterations:";
  container.appendChild(iterLabel);

  const iterSelect = document.createElement("select");
  [
    { value: "1",        label: "1" },
    { value: "2",        label: "2" },
    { value: "3",        label: "3" },
    { value: "5",        label: "5" },
    { value: "10",       label: "10" },
    { value: "infinite", label: "∞ Infinite" }
  ].forEach(optValue => {
    const opt = document.createElement("option");
    opt.value = optValue.value;
    opt.textContent = optValue.label;

    const current = animationSettings.iterations;
    if (
      (current === "infinite" && optValue.value === "infinite") ||
      (typeof current === "number" && String(current) === optValue.value)
    ) {
      opt.selected = true;
    }

    iterSelect.appendChild(opt);
  });

  iterSelect.addEventListener("change", () => {
    setIterations(iterSelect.value);
  });

  container.appendChild(iterSelect);
}