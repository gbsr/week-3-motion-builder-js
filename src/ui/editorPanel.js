import { PROPERTIES } from "../props/properties.js";

export function renderEditorPanel(step) {
  const panel = document.getElementById("editor-panel-content");
  panel.innerHTML = "";

  for (const propId in PROPERTIES) {
    const prop = PROPERTIES[propId];

    const propDiv = document.createElement("div");
    propDiv.className = "property-control";

    // "X", "Y", "Scale", ...
    const nameSpan = document.createElement("p");
    const propertyContainer = document.createElement("div");
    propertyContainer.className = "property-container";
    propertyContainer.appendChild(nameSpan);
    
    nameSpan.className = "ui-control";
    nameSpan.textContent = `${prop.label} `;
    
    propDiv.appendChild(propertyContainer);

    // FROM
    const labelFrom = document.createElement("label");
    labelFrom.htmlFor = `input-${prop.id}-from`;
    labelFrom.textContent = "From:";
    propDiv.appendChild(labelFrom);

    const inputFrom = document.createElement("input");
    inputFrom.type = "number";
    inputFrom.id = `input-${prop.id}-from`;
    inputFrom.min = prop.min;
    inputFrom.max = prop.max;
    inputFrom.step = prop.step;
    inputFrom.value = prop.defaultFrom;
    propDiv.appendChild(inputFrom);

    // TO
    const labelTo = document.createElement("label");
    labelTo.htmlFor = `input-${prop.id}-to`;
    labelTo.textContent = "To:";
    propDiv.appendChild(labelTo);

    const inputTo = document.createElement("input");
    inputTo.type = "number";
    inputTo.id = `input-${prop.id}-to`;
    inputTo.min = prop.min;
    inputTo.max = prop.max;
    inputTo.step = prop.step;
    inputTo.value = prop.defaultTo;
    propDiv.appendChild(inputTo);

    panel.appendChild(propDiv);
  }
}

export function renderTimingControls(step) {
  const timingPanel = document.getElementById("timing-controls");
  if (!timingPanel) return;

  // timingPanel.innerHTML = "";

  // Duration
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

  // Easing
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