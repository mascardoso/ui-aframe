import AFRAME from 'aframe'
import { lightenHoverColor } from './utils'

const UIVRBTNSECONDARY = "uivrbtnsecondary";

const getCurrentSecondaryColor = function (el) {
  return el.getAttribute(UIVRBTNSECONDARY).secondaryColor;
};

const setEventListeners = function (el) {
  let previousSecondaryColor = getCurrentSecondaryColor(el);

  el.addEventListener("mousedown", () => {
    previousSecondaryColor = getCurrentSecondaryColor(el);

    el.setAttribute(UIVRBTNSECONDARY, {
      secondaryColor: lightenHoverColor(previousSecondaryColor, -10), // darken slightly current color
    });
  });

  el.addEventListener("mouseup", function () {
    el.setAttribute(UIVRBTNSECONDARY, {
      secondaryColor: previousSecondaryColor,
    });
  });
};

const setButtonText = function (el, text, depth, width, color) {
  el.setAttribute("text", {
    value: text,
    color,
    zOffset: depth / 2 + 0.001,
    align: "center",
    width: width * 3,
  });
};

AFRAME.registerComponent(UIVRBTNSECONDARY, {
  schema: {
    text: { type: "string", default: "Click Me!" },
    textColor: { type: "color", default: "#000000" },
    width: { type: "number", default: 0.11 },
    height: { type: "number", default: 0.05 },
    depth: { type: "number", default: 0 },
    secondaryColor: { type: "color", default: "#FFFFFF" }
  },
  remove: function () {
    this.el.removeObject3D("mesh");
  },
  init: function () {
    const data = this.data; // Component button property values.
    const el = this.el; // Reference to the button entity.
    const elWidth = data.width;
    const elHeight = data.height;
    const elDepth = data.depth;
    const elSecondaryColor = data.secondaryColor;
    const elText = data.text;
    const elTextColor = data.textColor;

    // Create geometry.
    this.geometry = new AFRAME.THREE.BoxBufferGeometry(
      elWidth,
      elHeight,
      elDepth
    );

    // Create material.
    this.material = new AFRAME.THREE.MeshStandardMaterial({
      color: elSecondaryColor,
    });

    // Create mesh.
    this.mesh = new AFRAME.THREE.Mesh(this.geometry, this.material);

    // Set mesh on entity.
    el.setObject3D("mesh", this.mesh);

    // Set Text on Button
    setButtonText(el, elText, elDepth, elWidth, elTextColor);

    // Set Event Listeners on Button
    setEventListeners(el);
  },
  update: function (oldData) {
    const data = this.data;
    const el = this.el;

    // If `oldData` is empty, then this means we're in the initialization process.
    // No need to update.
    if (Object.keys(oldData).length === 0) {
      return;
    }

    // Geometry-related properties changed. Update the geometry.
    if (
      data.width !== oldData.width ||
      data.height !== oldData.height ||
      data.depth !== oldData.depth
    ) {
      el.getObject3D("mesh").geometry = new AFRAME.THREE.BoxBufferGeometry(
        data.width,
        data.height,
        data.depth
      );
      setButtonText(el, data.text, data.depth, data.width);
    }

    // Material-related properties changed. Update the material.
    if (data.secondaryColor !== oldData.secondaryColor) {
      el.getObject3D("mesh").material.color = new AFRAME.THREE.Color(
        data.secondaryColor
      );
    }

    // text-related properties changed. Update the text.
    if (data.text !== oldData.text || data.textColor !== oldData.textColor) {
      setButtonText(el, data.text, data.depth, data.width, data.textColor);
    }
  }
});
