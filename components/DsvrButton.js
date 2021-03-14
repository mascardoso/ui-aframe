const DSVRBUTTON = 'dsvrbutton'

const getCurrentPositionButton = function (el) {
  const position = el.getAttribute('position')
  return {
    x: position.x,
    y: position.y,
    z: position.z
  }
}

const getCurrentColor = function (el) {
  const color = el.getAttribute(DSVRBUTTON).color
  const onHoverColor = el.getAttribute(DSVRBUTTON).onHoverColor
  return {
    color,
    onHoverColor
  }
}

const setEventListeners = function (el, depth) {
  const {x,y,z} = getCurrentPositionButton(el)
  let defaultOldColor = getCurrentColor(el).color

  el.addEventListener('mousedown', function () {
    const { onHoverColor } = getCurrentColor(el)
    defaultOldColor = getCurrentColor(el).color

    el.setAttribute(DSVRBUTTON, {depth: depth / 2, color: onHoverColor});
    el.setAttribute('position', {x, y, z: z / 2});
  })

  el.addEventListener('mouseup', function () {
    el.setAttribute(DSVRBUTTON, {depth: depth, color: defaultOldColor});
    el.setAttribute('position', {x, y, z: z});
  })
}

const setButtonText = function (el, text, depth, width) {
  el.setAttribute('text', {
    value: text,
    color: 'white',
    zOffset: depth / 2 + 0.001,
    align: 'center',
    width: width * 3,
  })
}

AFRAME.registerComponent(DSVRBUTTON, {
  schema: {
    text: { type: 'string', default: 'Click Me!' },
    width: { type: 'number', default: 0.11 },
    height: { type: 'number', default: 0.05 },
    depth: { type: 'number', default: 0.04 },
    color: { type: 'color', default: '#88c88c' },
    onHoverColor: { type: 'color', default: '#5d5d5d' }
  },
  remove: function () {
    this.el.removeObject3D('mesh')
  },
  init: function () {
    const data = this.data // Component button property values.
    const el = this.el // Reference to the button entity.
    const elWidth = data.width 
    const elHeight = data.height
    const elDepth = data.depth
    const elColor = data.color
    const elText = data.text

    // Create geometry.
    this.geometry = new AFRAME.THREE.BoxBufferGeometry(elWidth, elHeight, elDepth)

    // Create material.
    this.material = new AFRAME.THREE.MeshStandardMaterial({ color: elColor })

    // Create mesh.
    this.mesh = new AFRAME.THREE.Mesh(this.geometry, this.material)

    // Set mesh on entity.
    el.setObject3D('mesh', this.mesh)

    // Set Text on Button
    setButtonText(el, elText, elDepth, elWidth)

    // Set Event Listeners on Button
    setEventListeners(el, elDepth)
  },
  update: function (oldData) {
    const data = this.data
    const el = this.el

    // If `oldData` is empty, then this means we're in the initialization process.
    // No need to update.
    if (Object.keys(oldData).length === 0) {
      return
    }

    // Geometry-related properties changed. Update the geometry.
    if (data.width !== oldData.width || data.height !== oldData.height || data.depth !== oldData.depth) {
      el.getObject3D('mesh').geometry = new AFRAME.THREE.BoxBufferGeometry(data.width, data.height, data.depth)
      setButtonText(el, data.text, data.depth, data.width)
    }

    // Material-related properties changed. Update the material.
    if (data.color !== oldData.color) {
      el.getObject3D('mesh').material.color = new AFRAME.THREE.Color(data.color)
    } else if (data.onHoverColor !== oldData.onHoverColor) {
      el.getObject3D('mesh').material.color = new AFRAME.THREE.Color(data.onHoverColor)
    }

    // text-related properties changed. Update the text.
    if (data.text !== oldData.text) {
      setButtonText(el, data.text, data.depth, data.width)
    }
  }
})