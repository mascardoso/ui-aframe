import AFRAME from 'aframe'
const loader = new AFRAME.THREE.FontLoader();
const FONTICON_FAMILY_URL = './assets/Roboto-msdf.json'
const UIVRHEADING = "uivrheading";
const FONTICON_SIZING_MAPPING = {
  "xs": "0.1 0.1 0.1",
  "s": "0.15 0.15 0.15",
  "m": "0.2 0.2 0.2",
  "l": "0.25 0.25 0.25",
  "xl": "0.3 0.3 0.3"
};

AFRAME.registerComponent(UIVRHEADING, {
  schema: {
    text: { type: "string", default: "heading" },
    size: { type: "string", default: "m" },
    color: { type: "color", default: "#FFFFFF" },
  },
  remove: function () {
    this.el.removeObject3D("mesh");
  },
  init: function () {
    const data = this.data;
    const el = this.el;
    const elColor = data.color;
    const elSize = data.size;
    const elText = data.text;
    const elAttrFont = el.getAttribute('font')
    const elAttrValue = el.getAttribute('value')
    const elAttrColor = el.getAttribute('color')
    
    !elAttrFont && !elAttrValue && loader.load(FONTICON_FAMILY_URL, function () {
      el.setAttribute("font", FONTICON_FAMILY_URL);
      el.setAttribute("value", elText);
      el.setAttribute("side", "double");
    });

    !elAttrColor && el.setAttribute("color", elColor);
    el.setAttribute("scale", FONTICON_SIZING_MAPPING[elSize])
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
    if (data.color !== oldData.color) {
      el.getObject3D("mesh").material.color = new AFRAME.THREE.Color(
        data.color
      );
    }
  },
});
