import SWebComponent from "coffeekraken-sugar/js/core/SWebComponent"
import html2canvas from "html2canvas"
import STimer from "coffeekraken-sugar/js/classes/STimer"
import debounce from "coffeekraken-sugar/js/utils/functions/debounce"
import addEventListener from "coffeekraken-sugar/js/dom/addEventListener"
import inViewportStatusChange from "coffeekraken-sugar/js/dom/inViewportStatusChange"
import isInViewport from "coffeekraken-sugar/js/dom/isInViewport"
import closest from "coffeekraken-sugar/js/dom/closest"
import {
  WebGLRenderer,
  OrthographicCamera,
  Scene,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  AmbientLight,
  DirectionalLight,
  EffectComposer,
  RenderPass,
  TextureLoader
} from "three-full"
import GlitchPass from "./GlitchPass"

/**
 * @name    SGlitchComponent
 * Create a nice glitch effect on any HTMLElement
 *
 * @example    html
 * <s-glitch>
 *   <!-- your html here -->
 * </s-glitch>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SGlitchComponent extends SWebComponent {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps() {
    return {
      /**
       * Specify the fps for the glitch effect
       * @prop
       * @type    {Integer}
       */
      fps: 30,

      /**
       * Specify the min timeout between the glitches phase in ms
       * @type
       * @prop    {Integer}
       */
      minTimeout: 0,

      /**
       * Specify the max timeout between the glitches phase in ms
       * @prop
       * @type    {Integer}
       */
      maxTimeout: 5000,

      /**
       * Specify the min glitch duration in ms
       * @prop
       * @type    {Integer}
       */
      minDuration: 100,

      /**
       * Specify the max glitch duration in ms
       * @prop
       * @type    {Integer}
       */
      maxDuration: 2000,

      /**
       * Specify if want to pause the glitch effect on hover
       * @prop
       * @type    {Boolean}
       */
      pauseOnHover: false,

      /**
       * Specify if want to pause the glitch effect when out of viewport
       * @prop
       * @type    {Boolean}
       */
      pauseWhenOut: true,

      /**
       * Specify if want to glitch onhover. If set a css selector, will take this as source of hover
       * @prop
       * @type    {Mixed}
       */
      glitchOnHover: false
    }
  }

  /**
   * Mount dependencies
   * @definition    SWebComponent.mountDependencies
   * @protected
   */
  static get mountDependencies() {
    return [
      function() {
        return new Promise(resolve => {
          if (this.ownerDocument === window.document) resolve()
        })
      }
    ]
  }

  /**
   * Css
   * @protected
   */
  static defaultCss(componentName, componentNameDash) {
    return `
      ${componentNameDash} {
        display: block;
        position: relative;
      }
      .${componentNameDash}__canvas {
        display: none;
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
      }
      ${componentNameDash}.glitch .${componentNameDash}__canvas {
        display: block;
      }
    `
  }

  /**
   * Component will mount
   * @definition    SWebComponent.componentWillMount
   * @protected
   */
  componentWillMount() {
    super.componentWillMount()
  }

  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */
  async componentMount() {
    super.componentMount()

    try {
      const canvas = await this._getHtml2Canvas()
      this._$canvas = await this._initScene(canvas.toDataURL())

      this._render()

      this._initTimeoutTimer()
      this._initGlitchTimer()

      if (
        !this.props.glitchOnHover &&
        (!this.props.pauseWhenOut || isInViewport(this))
      ) {
        this._startTimeout()
      }

      // init glitch on hover handler
      if (this.props.glitchOnHover) {
        this._addGlitchOnHoverHandler()
      }

      // init hover handler
      if (this.props.pauseOnHover && !this.props.glitchOnHover) {
        this._addHoverHandler()
      }

      // in viewport change detector
      if (this.props.pauseWhenOut && !this.props.glitchOnHover) {
        this._addInViewportChangeDetector()
      }

      // init the resize handler
      this._addResizeHandler()
    } catch (e) {
      // do nothing here
    }
  }

  /**
   * Component unmount
   * @definition    SWebComponent.componentUnmount
   * @protected
   */
  componentUnmount() {
    super.componentUnmount()

    if (this._removeResizeHandlerFn) {
      this._removeResizeHandlerFn()
    }

    this._removeHoverHandler()
    this._removeInViewportChangeDetector()
    this._removeGlitchOnHoverHandler()

    // destroy timers
    this._timeoutTimer.destroy()
    this._glitchTimer.destroy()
  }

  /**
   * Component will receive prop
   * @definition    SWebComponent.componentWillReceiveProp
   * @protected
   */
  componentWillReceiveProp(name, newVal, oldVal) {
    super.componentWillReceiveProp(name, newVal, oldVal)
    switch (name) {
      case "pauseOnHover":
        if (newVal && !this.props.glitchOnHover) this._addHoverHandler()
        else this._removeHoverHandler()
        break
      case "pauseWhenOut":
        if (newVal && !this.props.glitchOnHover)
          this._addInViewportChangeDetector()
        else this._removeInViewportChangeDetector()
        break
      case "glitchOnHover":
        if (newVal) this._addGlitchOnHoverHandler()
        else this._removeGlitchOnHoverHandler()
        break
      default:
    }
  }

  /**
   * Pause the glitch timeout
   * @return    {SGlitchComponent}    The component instance
   */
  pause() {
    this._pauseTimeout()
    return this
  }

  /**
   * Start the glitch timeout
   * @return    {SGlitchComponent}    The component instance
   */
  start() {
    this._startTimeout()
    return this
  }

  /**
   * Check if the timeout is started
   * @return    {Boolean}    true if started, false if not
   */
  isStarted() {
    return this._timeoutTimer.isStarted()
  }

  /**
   * Add glitch on hover handler
   */
  _addGlitchOnHoverHandler() {
    const $target =
      typeof this.props.glitchOnHover === "string"
        ? closest(this, this.props.glitchOnHover)
        : this

    this._removeGlitchOnHoverFn = addEventListener(
      $target,
      "mouseenter",
      () => {
        this._startTimeout()
      }
    )
    this._removeGlitchOnHoverOutFn = addEventListener(
      $target,
      "mouseleave",
      () => {
        this._pauseTimeout()
      }
    )
  }

  /**
   * Remove glitch on hover handler
   */
  _removeGlitchOnHoverHandler() {
    if (this._removeGlitchOnHoverFn) this._removeGlitchOnHoverFn()
    if (this._removeGlitchOnHoverOutFn) this._removeGlitchOnHoverOutFn()
  }

  /**
   * Add in viewport change detector
   */
  _addInViewportChangeDetector() {
    this._inViewportChangeDetector = inViewportStatusChange(
      this,
      () => {
        // start the timeout again
        this._startTimeout()
      },
      () => {
        // pause the timeout
        this._pauseTimeout()
      }
    )
  }

  /**
   * Remove the in viewport change detector
   */
  _removeInViewportChangeDetector() {
    if (this._inViewportChangeDetector) {
      this._inViewportChangeDetector.destroy()
    }
    // start the timeout again just in case
    this._startTimeout()
  }

  /**
   * Init hover handler
   */
  _addHoverHandler() {
    this._removeHoverHandlerFn = addEventListener(this, "mouseenter", () => {
      // pause the timeout
      this._pauseTimeout()
    })
    this._removeOutHandlerFn = addEventListener(this, "mouseleave", () => {
      // start the timeout again
      this._startTimeout()
    })
  }

  /**
   * Remove hover handler
   */
  _removeHoverHandler() {
    if (this._removeHoverHandlerFn) this._removeHoverHandlerFn()
    if (this._removeOutHandlerFn) this._removeOutHandlerFn()
  }

  /**
   * Init the resize handler
   */
  _addResizeHandler() {
    this._removeResizeHandlerFn = addEventListener(
      window,
      "resize",
      debounce(async () => {
        this._isResizing = true
        this._renderer.setSize(this.offsetWidth, this.offsetHeight)
        const canvas = await this._getHtml2Canvas()
        const material = await this._loadTexturedMaterial(canvas.toDataURL())
        this._plane.material = material
        this._render()
        setTimeout(() => {
          this._isResizing = false
        })
      }, 500)
    )
  }

  /**
   * Init the timeout timer
   */
  _initTimeoutTimer() {
    this._timeoutTimer = new STimer(
      this.props.minTimeout +
        Math.round(
          Math.random() * (this.props.maxTimeout - this.props.minTimeout)
        ),
      {
        tickCount: 1
      }
    )
    this._timeoutTimer.onTick(this._startGlitch.bind(this))
  }

  _pauseTimeout() {
    this._isTimeoutStarted = false
    this._timeoutTimer.pause()
  }

  /**
   * Start a timeout iteration that will start a glitch at his end
   */
  _startTimeout() {
    this._timeoutTimer.duration(
      this.props.minTimeout +
        Math.round(
          Math.random() * (this.props.maxTimeout - this.props.minTimeout)
        )
    )
    this._isTimeoutStarted = true
    this._timeoutTimer.start()
  }

  /**
   * Init glitch timer
   */
  _initGlitchTimer() {
    const duration =
      this.props.minDuration +
      Math.round(
        Math.random() * (this.props.maxDuration - this.props.minDuration)
      )
    this._glitchTimer = new STimer(duration, {
      tickCount: (this.props.fps / 1000) * duration
    })
    this._glitchTimer.onTick(this._render.bind(this))
    this._glitchTimer.onComplete(() => {
      this.classList.remove("glitch")
      if (this._isTimeoutStarted) this._startTimeout()
    })
  }

  /**
   * Start a glitch iteration
   */
  _startGlitch() {
    this.classList.add("glitch")
    const duration =
      this.props.minDuration +
      Math.round(
        Math.random() * (this.props.maxDuration - this.props.minDuration)
      )
    this._glitchTimer.duration(duration)
    this._glitchTimer.tickCount((this.props.fps / 1000) * duration)
    this._glitchTimer.start()
  }

  /**
   * Transform the dom into a canvas element
   * @return    {HTMLCanvasElement}    A canvas element that contain the dom drawn on it
   */
  async _getHtml2Canvas() {
    const canvas = await html2canvas(this, {
      logging: false,
      useCORS: true,
      removeContainer: false,
      ignoreElements: element => {
        if (element.tagName.toLowerCase() === "canvas") return true
        return false
      }
    })
    return canvas
  }

  /**
   * Init the 3d scene with light and plae
   * @param    {String}    image    urlData image to apply on the plane
   * @return    {HTMLCanvasElement}    The canvas on which the glitch will be drawn
   */
  async _initScene(image) {
    this._renderer = new WebGLRenderer()
    this._renderer.setSize(this.offsetWidth, this.offsetHeight)
    this._renderer.domElement.classList.add(`${this.componentNameDash}__canvas`)
    this.appendChild(this._renderer.domElement)

    // camera
    const camera = new OrthographicCamera(
      -this.offsetWidth * 0.5,
      this.offsetWidth * 0.5,
      this.offsetHeight * 0.5,
      -this.offsetHeight * 0.5,
      1,
      10000
    )
    camera.position.z = 100

    // scene
    const scene = new Scene()
    scene.add(camera)

    const texturedMaterial = await this._loadTexturedMaterial(image)

    // plane
    this._plane = new Mesh(
      new PlaneGeometry(this.offsetWidth, this.offsetHeight),
      texturedMaterial
    )
    this._plane.overdraw = true
    scene.add(this._plane)

    // add subtle ambient lighting
    const ambientLight = new AmbientLight(0x555555)
    scene.add(ambientLight)

    // add directional light source
    const directionalLight = new DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1, 1).normalize()
    scene.add(directionalLight)

    this._composer = new EffectComposer(this._renderer)
    this._composer.addPass(new RenderPass(scene, camera))

    const glitchDtSize = 64
    const glitchPass = new GlitchPass(glitchDtSize)
    glitchPass.renderToScreen = true
    glitchPass.goWild = true
    this._composer.addPass(glitchPass)

    // resolve the init scene
    return this._renderer.domElement
  }

  /**
   * Render a glitch frame
   */
  _render() {
    if (this._isResizing) return
    this._composer.render()
  }

  /**
   * Load the textured material to apply on the place
   * @param    {String}    image    The urlData of the texture to apply
   * @return    {MeshBasicMaterial}    The basic material with the texture applied on it
   */
  async _loadTexturedMaterial(image) {
    const texture = await this._loadTexture(image)
    const texturedMaterial = new MeshBasicMaterial({
      map: texture
    })
    texturedMaterial.map.needsUpdate = true
    return texturedMaterial
  }

  /**
   * Load a texture
   * @param    {String}    image    The urlData of the texture to load
   * @return    {Texture}    The loaded texture to apply on a material
   */
  _loadTexture(image) {
    return new Promise((resolve, reject) => {
      const loader = new TextureLoader()
      loader.load(
        image,
        texture => {
          resolve(texture)
        },
        // onProgress callback currently not supported
        undefined,
        // onError callback
        err => {
          reject(err)
        }
      )
    })
  }
}
