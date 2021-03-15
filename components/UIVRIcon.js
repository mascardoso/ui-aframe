const UIVRICON = "uivricon";

AFRAME.registerComponent(UIVRICON, {
  schema: {
    icon: { type: "string", default: "fa-info" },
    iconColor: { type: "color", default: "#FFFFFF" },
    width: { type: "number", default: 0.11 },
    height: { type: "number", default: 0.05 },
    depth: { type: "number", default: 0.04 },
    primaryColor: { type: "color", default: "#88c88c" }
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
    const elIcon = data.icon;
    const elIconColor = data.iconColor;

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
    }

    // Material-related properties changed. Update the material.
    if (data.primaryColor !== oldData.primaryColor) {
      el.getObject3D("mesh").material.color = new AFRAME.THREE.Color(
        data.primaryColor
      );
    }

    // // text-related properties changed. Update the text.
    // if (data.text !== oldData.text || data.textColor !== oldData.textColor) {
    //   setButtonText(el, data.text, data.depth, data.width, data.textColor);
    // }
  }
});
