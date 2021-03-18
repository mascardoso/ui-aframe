import dat from "dat.gui";

const initColorControls = function (data) {
  this.primary = data.primaryColor;
};

export const addGUI = function (uis) {
  const gui = new dat.GUI();

  uis.map((ui) => {
    Object.keys(ui).map((folder, index) => {
      gui.addFolder(folder);
      Object.keys(ui[folder]).map((component, index) => {
        const els = document.querySelectorAll(`a-entity[${component}]`);
        let colorControls;
        els.forEach(el => {
          const data = el.getAttribute(component);
          colorControls = new initColorControls(data);
        });

      });
    });
  });

  // const elements = document.querySelectorAll(`a-entity[${ui.component}]`);
  // if (elements.length > 0) {
  //   const folder = gui.addFolder(ui.folder);
  //   let controls;
  //   elements.forEach((el) => {
  //     const data = el.getAttribute(ui.component);
  //     controls = new initControls(data);
  //   });
  //   folder.addColor(controls, "primary").onChange(() => {
  //     elements.forEach((el) => {
  //       el.setAttribute(ui.component, { primaryColor: controls.primary });
  //     });
  //   });

  //   folder.open();
  //   return ui;
  // }
};
