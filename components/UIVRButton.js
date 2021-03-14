const UIVRBUTTON = "uivrbutton";

const lightenHoverColor = function (color, percent) {
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
};

const getCurrentPositionButton = function (el) {
  const position = el.getAttribute("position");
  return {
    x: position.x,
    y: position.y,
    z: position.z,
  };
};

const getCurrentPrimaryColor = function (el) {
  return el.getAttribute(UIVRBUTTON).primaryColor;
};

const setEventListeners = function (el, depth) {
  const { x, y, z } = getCurrentPositionButton(el);
  let previousPrimaryColor = getCurrentPrimaryColor(el);

  el.addEventListener("mousedown", function () {
    previousPrimaryColor = getCurrentPrimaryColor(el);

    el.setAttribute(UIVRBUTTON, {
      depth: depth / 2,
      primaryColor: lightenHoverColor(previousPrimaryColor, -10), // darken slightly current color
    });
    el.setAttribute("position", { x, y, z: z / 2 });
  });

  el.addEventListener("mouseup", function () {
    el.setAttribute(UIVRBUTTON, {
      depth: depth,
      primaryColor: previousPrimaryColor,
    });
    el.setAttribute("position", { x, y, z: z });
  });
};

const setButtonText = function (el, text, depth, width) {
  el.setAttribute("text", {
    value: text,
    color: "white",
    zOffset: depth / 2 + 0.001,
    align: "center",
    width: width * 3,
  });
};

AFRAME.registerComponent(UIVRBUTTON, {
  schema: {
    text: { type: "string", default: "Click Me!" },
    width: { type: "number", default: 0.11 },
    height: { type: "number", default: 0.05 },
    depth: { type: "number", default: 0.04 },
    primaryColor: { type: "color", default: "#88c88c" },
    onHoverColor: { type: "color", default: "#5d5d5d" },
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
    const elPrimaryColor = data.primaryColor;
    const elText = data.text;

    // Create geometry.
    this.geometry = new AFRAME.THREE.BoxBufferGeometry(
      elWidth,
      elHeight,
      elDepth
    );

    // Create material.
    this.material = new AFRAME.THREE.MeshStandardMaterial({
      color: elPrimaryColor,
    });

    // Create mesh.
    this.mesh = new AFRAME.THREE.Mesh(this.geometry, this.material);

    // Set mesh on entity.
    el.setObject3D("mesh", this.mesh);

    // Set Text on Button
    setButtonText(el, elText, elDepth, elWidth);

    // Set Event Listeners on Button
    setEventListeners(el, elDepth);
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
    if (data.primaryColor !== oldData.primaryColor) {
      el.getObject3D("mesh").material.color = new AFRAME.THREE.Color(
        data.primaryColor
      );
    }

    // text-related properties changed. Update the text.
    if (data.text !== oldData.text) {
      setButtonText(el, data.text, data.depth, data.width);
    }
  },
});
