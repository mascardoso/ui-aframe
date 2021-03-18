import AFRAME from 'aframe'
const loader = new AFRAME.THREE.FontLoader();
const FONTICON_FAMILY_URL = './assets/fa-solid-900-msdf.json'
const UIVRICON = "uivricon";
const FONTICON_FAMILY_MAPPING = {
  "adjust": "",
  "arrow-alt-circle-down": "",
  "arrow-alt-circle-left":"",
  "arrow-alt-circle-right":"",
  "arrow-alt-circle-up":"",
  "battery-full":"",
  "battery-empty":"",
  "bell":"",
  "bell-slash":"",
  "bolt":"",
  "calendar-alt":"",
  "camera":"",
  "check-circle":"",
  "cog":"",
  "comment":"",
  "dollar-sign":"",
  "exclamation-circle":""  
};
const FONTICON_SIZING_MAPPING = {
  "xs": "0.2 0.2 0.2",
  "s": "0.4 0.4 0.4",
  "m": "0.6 0.6 0.6",
  "l": "0.8 0.8 0.8",
  "xl": "1 1 1"
};

AFRAME.registerComponent(UIVRICON, {
  schema: {
    icon: { type: "string", default: "check-circle" },
    size: { type: "string", default: "s" },
    color: { type: "color", default: "#FFFFFF" },
  },
  remove: function () {
    this.el.removeObject3D("mesh");
  },
  init: function () {
    const data = this.data;
    const el = this.el;
    const elIcon = data.icon;
    const elIconSize = data.size;
    const elColor = data.color;
    const elAttrFont = el.getAttribute('font')
    const elAttrValue = el.getAttribute('value')
    const elAttrColor = el.getAttribute('color')
    
    !elAttrFont && !elAttrValue && loader.load(FONTICON_FAMILY_URL, function () {
      el.setAttribute("font", FONTICON_FAMILY_URL);
      el.setAttribute("value", FONTICON_FAMILY_MAPPING[elIcon]);
      el.setAttribute("side", "double");
      el.setAttribute("negate", "false");
    });

    !elAttrColor && el.setAttribute("color", elColor);
    el.setAttribute("scale", FONTICON_SIZING_MAPPING[elIconSize])
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
