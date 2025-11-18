import { PROPERTIES } from "../props/properties.js";

export default function renderEditorPanel(step) {
  console.log("Rendering editor panel");
  const panel = document.getElementById("editor-panel-content");
  panel.innerHTML = ""; // clear existing content
  for (const propId in PROPERTIES) {
    const prop = PROPERTIES[propId];

    console.log("Rendering property:", propId, prop);
  }
}
 