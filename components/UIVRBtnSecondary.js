const UIVRBTNSECONDARY = "uivrbtnsecondary";

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
  lightenHoverColor: function (color, percent) {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = ((num >> 8) & 0x00ff) + amt,
      G = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
      )
        .toString(16)
        .slice(1)
    );
  },  
  getCurrentSecondaryColor: function (el) {
    return el.getAttribute(UIVRBTNSECONDARY).secondaryColor;
  },
  setEventListeners: function (el) {
    let previousSecondaryColor = this.getCurrentSecondaryColor(el);
  
    el.addEventListener("mousedown", () => {
      previousSecondaryColor = this.getCurrentSecondaryColor(el);
  
      el.setAttribute(UIVRBTNSECONDARY, {
        secondaryColor: this.lightenHoverColor(previousSecondaryColor, -10), // darken slightly current color
      });
    });
  
    el.addEventListener("mouseup", function () {
      el.setAttribute(UIVRBTNSECONDARY, {
        secondaryColor: previousSecondaryColor,
      });
    });
  },
  setButtonText: function (el, text, depth, width, color) {
    el.setAttribute("text", {
      value: text,
      color,
      zOffset: depth / 2 + 0.001,
      align: "center",
      width: width * 3,
    });
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
    this.setButtonText(el, elText, elDepth, elWidth, elTextColor);

    // Set Event Listeners on Button
    this.setEventListeners(el);
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
      this.setButtonText(el, data.text, data.depth, data.width);
    }

    // Material-related properties changed. Update the material.
    if (data.secondaryColor !== oldData.secondaryColor) {
      el.getObject3D("mesh").material.color = new AFRAME.THREE.Color(
        data.secondaryColor
      );
    }

    // text-related properties changed. Update the text.
    if (data.text !== oldData.text || data.textColor !== oldData.textColor) {
      this.setButtonText(el, data.text, data.depth, data.width, data.textColor);
    }
  }
});
