const UIVRICON = "uivricon";
const FONTICON_FAMILY = "./components/assets/fa-solid-900-msdf.json";

// move this into mapping json
const FONTICON_FAMILY_MAPPING = {
  "fa-ad": "",
  "fa-address-book": "",
};

AFRAME.registerComponent(UIVRICON, {
  schema: {
    icon: { type: "string", default: "fa-ad" },
    primaryColor: { type: "color", default: "#EF2D5E" },
  },
  remove: function () {
    this.el.removeObject3D("mesh");
  },
  init: function () {
    const data = this.data;
    const el = this.el;
    const elIcon = data.icon;
    const elPrimaryColor = data.primaryColor;

    const loader = new AFRAME.THREE.FontLoader();
    loader.load(FONTICON_FAMILY, function () {
      el.setAttribute("font", FONTICON_FAMILY);
      el.setAttribute("color", elPrimaryColor);
      el.setAttribute("value", FONTICON_FAMILY_MAPPING[elIcon]);
      el.setAttribute("side", "double");
      el.setAttribute("negate", "false");
    });
  },
  update: function (oldData) {
    const data = this.data;
    const el = this.el;

    // If `oldData` is empty, then this means we're in the initialization process.
    // No need to update.
    if (Object.keys(oldData).length === 0) {
      return;
    }

    // Material-related properties changed. Update the material.
    if (data.primaryColor !== oldData.primaryColor) {
      el.getObject3D("mesh").material.color = new AFRAME.THREE.Color(
        data.primaryColor
      );
    }
  },
});
