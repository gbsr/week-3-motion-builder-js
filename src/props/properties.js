export const PROPERTIES = {
  x: {
    id: "x",
    label: "X",
    type: "number",
    min: -400,
    max: 400,
    step: 1,
    defaultFrom: 0,
    defaultTo: 0,
    category: "transform",
    unit: "px",
    appliesTo: "transform"
  },

  y: {
    id: "y",
    label: "Y",
    type: "number",
    min: -400,
    max: 400,
    step: 1,
    defaultFrom: 0,
    defaultTo: 0,
    category: "transform",
    unit: "px",
    appliesTo: "transform"
  },

  scale: {
    id: "scale",
    label: "Scale",
    type: "number",
    min: 0.25,
    max: 3,
    step: 0.01,
    defaultFrom: 1,
    defaultTo: 1,
    category: "transform",
    unit: "",
    appliesTo: "transform"
  },

  opacity: {
    id: "opacity",
    label: "Opacity",
    type: "number",
    min: 0,
    max: 1,
    step: 0.01,
    defaultFrom: 1,
    defaultTo: 1,
    category: "style",
    unit: "",
    appliesTo: "style.opacity"
  },

  borderRadius: {
    id: "borderRadius",
    label: "Border Radius",
    type: "number",
    min: 0,
    max: 90,
    step: 1,
    defaultFrom: 20,
    defaultTo: 20,
    category: "style",
    unit: "px",
    appliesTo: "style.borderRadius"
  },

  borderWidth: {
    id: "borderWidth",
    label: "Border Width",
    type: "number",
    min: 0,
    max: 20,
    step: 1,
    defaultFrom: 1,
    defaultTo: 1,
    category: "style",
    unit: "px",
    appliesTo: "style.borderWidth"
  },
};