function getSphere() {
  const el = document.querySelector("[data-sphere]");
  return { el, currentRadius: parseFloat(el.getAttribute("radius")) };
}
function growSphere() {
  const { el, currentRadius } = getSphere();
  el.setAttribute("radius", currentRadius + 0.05);
}
function shrinkSphere() {
  const { el, currentRadius } = getSphere();
  el.setAttribute("radius", currentRadius - 0.05);
}
