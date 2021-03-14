const initControls = function(data) {
  this.primary = data.color;
};

const addGUI = function(uis) {
  const gui = new dat.GUI()

  uis.map(ui => {
    const elements = document.querySelectorAll(`a-entity[${ui.component}]`)
    if(elements.length > 0) {
      const folder = gui.addFolder(ui.folder)
      let controls
      elements.forEach(el => {
          const data = el.getAttribute(ui.component)
          controls = new initControls(data);
      });
  
      folder.addColor(controls, 'primary').onChange(() => {
          elements.forEach(el => {
              el.setAttribute(ui.component, {color: controls.primary});
          });
      });
    
      folder.open()
      return ui
    }
  })
}