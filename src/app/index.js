import { addGUI } from "./gui";
import { growSphere, shrinkSphere } from "./events";

window.app = {
  growSphere,
  shrinkSphere
}

window.onload = function () {
  addGUI([{
    colors: {
      uivrbtn: ['primary'],
      uivrbtnsecondary: ['secondary']
    },
  }]);
};