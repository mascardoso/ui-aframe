const getSphere = () => {
  const el = document.querySelector("[data-sphere]");
  return { el, currentRadius: parseFloat(el.getAttribute("radius")) };
};

const growSphere = () => {
  const { el, currentRadius } = getSphere();
  el.setAttribute("radius", currentRadius + 0.05);
};

const shrinkSphere = () => {
  const { el, currentRadius } = getSphere();
  el.setAttribute("radius", currentRadius - 0.05);
};

export {
  growSphere,
  shrinkSphere
}