import { PROPERTIES } from "../props/properties.js";

export function renderEditorPanel(step, parent) {
  const panel = document.createElement("div");
  panel.className = "editor-panel-content";
  parent.appendChild(panel);

  for (const propId in PROPERTIES) {
    const prop = PROPERTIES[propId];

    const propDiv = document.createElement("div");
    propDiv.className = "property-control";

    const propertyContainer = document.createElement("div");
    propertyContainer.className = "property-container";

    const nameSpan = document.createElement("p");
    nameSpan.className = "ui-control";
    nameSpan.textContent = prop.label;
    propertyContainer.appendChild(nameSpan);

    propDiv.appendChild(propertyContainer);

    const labelFrom = document.createElement("label");
    labelFrom.textContent = "From:";
    propDiv.appendChild(labelFrom);

    const inputFrom = document.createElement("input");
    inputFrom.type = "number";
    inputFrom.min = prop.min;
    inputFrom.max = prop.max;
    inputFrom.step = prop.step;
    inputFrom.value = step.from[propId];
    inputFrom.addEventListener("input", () => {
      step.from[propId] = Number(inputFrom.value);
    });
    propDiv.appendChild(inputFrom);

    const labelTo = document.createElement("label");
    labelTo.textContent = "To:";
    propDiv.appendChild(labelTo);

    const inputTo = document.createElement("input");
    inputTo.type = "number";
    inputTo.min = prop.min;
    inputTo.max = prop.max;
    inputTo.step = prop.step;
    inputTo.value = step.to[propId];
    inputTo.addEventListener("input", () => {
      step.to[propId] = Number(inputTo.value);
    });
    propDiv.appendChild(inputTo);

    panel.appendChild(propDiv);
  }
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