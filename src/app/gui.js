import dat from "dat.gui";

export const addGUI = function () {
  const gui = new dat.GUI();

  const initControls = function (type, folder, data) {
    this[`${type}${folder}`] = data[`${type}${folder}`];
  };

  const matchedUivrAttr = (attrs) =>
    Object.keys(attrs)
      .map((attr) => attrs[attr].name)
      .filter((name) => name.match(/uivr\w+/g))[0];

  // COLORS

  const folderColors = gui.addFolder("Color");
  let controlsPrimaryColors;
  let controlsSecondaryColors;
  const elsWithPrimaryColor = document.querySelectorAll("a-entity[uivrbtn]");
  const elsWithSecondaryColor = document.querySelectorAll(
    "a-entity[uivrbtnsecondary]"
  );

  elsWithPrimaryColor.forEach((el) => {
    const data = el.getAttribute(matchedUivrAttr(el.attributes));
    controlsPrimaryColors = new initControls("primary", "Color", data);
  });
  folderColors.addColor(controlsPrimaryColors, "primaryColor").onChange(() => {
    elsWithPrimaryColor.forEach((el) => {
      el.setAttribute("uivrbtn", {
        primaryColor: controlsPrimaryColors.primaryColor,
      });
    });
  });

  elsWithSecondaryColor.forEach((el) => {
    const data = el.getAttribute(matchedUivrAttr(el.attributes));
    controlsSecondaryColors = new initControls("secondary", "Color", data);
  });
  folderColors
    .addColor(controlsSecondaryColors, "secondaryColor")
    .onChange(() => {
      elsWithSecondaryColor.forEach((el) => {
        el.setAttribute("uivrbtnsecondary", {
          secondaryColor: controlsSecondaryColors.secondaryColor,
        });
      });
    });

  folderColors.open();

  // END COLOR
};
