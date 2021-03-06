"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true
})
exports.default = void 0

var _SWebComponent2 = _interopRequireDefault(
  require("coffeekraken-sugar/js/core/SWebComponent")
)

var _html2canvas = _interopRequireDefault(require("html2canvas"))

var _STimer = _interopRequireDefault(
  require("coffeekraken-sugar/js/classes/STimer")
)

var _debounce = _interopRequireDefault(
  require("coffeekraken-sugar/js/utils/functions/debounce")
)

var _addEventListener = _interopRequireDefault(
  require("coffeekraken-sugar/js/dom/addEventListener")
)

var _dispatchEvent = _interopRequireDefault(
  require("coffeekraken-sugar/js/dom/dispatchEvent")
)

var _inViewportStatusChange = _interopRequireDefault(
  require("coffeekraken-sugar/js/dom/inViewportStatusChange")
)

var _isInViewport = _interopRequireDefault(
  require("coffeekraken-sugar/js/dom/isInViewport")
)

var _closest = _interopRequireDefault(
  require("coffeekraken-sugar/js/dom/closest")
)

var _imagesLoaded = _interopRequireDefault(
  require("coffeekraken-sugar/js/dom/imagesLoaded")
)

var _backgroundImageLoaded = _interopRequireDefault(
  require("coffeekraken-sugar/js/dom/backgroundImageLoaded")
)

var _querySelectorAllWithStyle = _interopRequireDefault(
  require("coffeekraken-sugar/js/dom/querySelectorAllWithStyle")
)

var _threeFull = require("three-full")

var _GlitchPass = _interopRequireDefault(require("./GlitchPass"))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj
    }
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj
    }
  }
  return _typeof(obj)
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg)
    var value = info.value
  } catch (error) {
    reject(error)
    return
  }
  if (info.done) {
    resolve(value)
  } else {
    Promise.resolve(value).then(_next, _throw)
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args)
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value)
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err)
      }
      _next(undefined)
    })
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ("value" in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call
  }
  return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return self
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property)
      if (!base) return
      var desc = Object.getOwnPropertyDescriptor(base, property)
      if (desc.get) {
        return desc.get.call(receiver)
      }
      return desc.value
    }
  }
  return _get(target, property, receiver || target)
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object)
    if (object === null) break
  }
  return object
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function")
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf(o, p)
}

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
var SGlitchComponent =
  /*#__PURE__*/
  (function(_SWebComponent) {
    _inherits(SGlitchComponent, _SWebComponent)

    function SGlitchComponent() {
      _classCallCheck(this, SGlitchComponent)

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(SGlitchComponent).apply(this, arguments)
      )
    }

    _createClass(
      SGlitchComponent,
      [
        {
          key: "componentWillMount",

          /**
           * Component will mount
           * @definition    SWebComponent.componentWillMount
           * @protected
           */
          value: function componentWillMount() {
            _get(
              _getPrototypeOf(SGlitchComponent.prototype),
              "componentWillMount",
              this
            ).call(this)
          }
          /**
           * Mount component
           * @definition    SWebComponent.componentMount
           * @protected
           */
        },
        {
          key: "componentMount",
          value: (function() {
            var _componentMount = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var canvas
                return regeneratorRuntime.wrap(
                  function _callee$(_context) {
                    while (1) {
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          _get(
                            _getPrototypeOf(SGlitchComponent.prototype),
                            "componentMount",
                            this
                          ).call(this)

                          _context.prev = 1
                          _context.next = 4
                          return this._getHtml2Canvas()

                        case 4:
                          canvas = _context.sent
                          _context.next = 7
                          return this._initScene(canvas.toDataURL())

                        case 7:
                          this._$canvas = _context.sent

                          this._render()

                          this._initTimeoutTimer()

                          this._initGlitchTimer()

                          if (
                            !this.props.glitchOnHover &&
                            (!this.props.pauseWhenOut ||
                              (0, _isInViewport.default)(this))
                          ) {
                            this._startTimeout()
                          } // init glitch on hover handler

                          if (this.props.glitchOnHover) {
                            this._addGlitchOnHoverHandler()
                          } // init hover handler

                          if (
                            this.props.pauseOnHover &&
                            !this.props.glitchOnHover
                          ) {
                            this._addHoverHandler()
                          } // in viewport change detector

                          if (
                            this.props.pauseWhenOut &&
                            !this.props.glitchOnHover
                          ) {
                            this._addInViewportChangeDetector()
                          } // init the resize handler

                          this._addResizeHandler()
                          /**
                           * @event
                           * @name    ready
                           * Dispatched when the component is ready to accept inputs like "start", "pause", etc...
                           */

                          ;(0, _dispatchEvent.default)(this, "ready")
                          _context.next = 21
                          break

                        case 19:
                          _context.prev = 19
                          _context.t0 = _context["catch"](1)

                        case 21:
                        case "end":
                          return _context.stop()
                      }
                    }
                  },
                  _callee,
                  this,
                  [[1, 19]]
                )
              })
            )

            function componentMount() {
              return _componentMount.apply(this, arguments)
            }

            return componentMount
          })()
          /**
           * Component unmount
           * @definition    SWebComponent.componentUnmount
           * @protected
           */
        },
        {
          key: "componentUnmount",
          value: function componentUnmount() {
            _get(
              _getPrototypeOf(SGlitchComponent.prototype),
              "componentUnmount",
              this
            ).call(this)

            if (this._removeResizeHandlerFn) {
              this._removeResizeHandlerFn()
            }

            this._removeHoverHandler()

            this._removeInViewportChangeDetector()

            this._removeGlitchOnHoverHandler() // destroy timers

            this._timeoutTimer.destroy()

            this._glitchTimer.destroy()
          }
          /**
           * Component will receive prop
           * @definition    SWebComponent.componentWillReceiveProp
           * @protected
           */
        },
        {
          key: "componentWillReceiveProp",
          value: function componentWillReceiveProp(name, newVal, oldVal) {
            _get(
              _getPrototypeOf(SGlitchComponent.prototype),
              "componentWillReceiveProp",
              this
            ).call(this, name, newVal, oldVal)

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
        },
        {
          key: "pause",
          value: function pause() {
            this._pauseTimeout()

            return this
          }
          /**
           * Start the glitch timeout
           * @return    {SGlitchComponent}    The component instance
           */
        },
        {
          key: "start",
          value: function start() {
            this._startTimeout()

            return this
          }
          /**
           * Check if the timeout is started
           * @return    {Boolean}    true if started, false if not
           */
        },
        {
          key: "isStarted",
          value: function isStarted() {
            return this._isTimeoutStarted
          }
          /**
           * Call this function when the dom has been upated to refresh the glitch canvas
           * @return    {Promise}    A promise when the canvas has been updated
           */
        },
        {
          key: "domUpdated",
          value: function domUpdated() {
            return this._updateCanvas()
          }
          /**
           * Update the canvas that will be glitched with the current dom
           * @return    {Promise}    A promise when the canvas has been updated
           */
        },
        {
          key: "_updateCanvas",
          value: (function() {
            var _updateCanvas2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2() {
                var canvas, material
                return regeneratorRuntime.wrap(
                  function _callee2$(_context2) {
                    while (1) {
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          _context2.next = 2
                          return this._getHtml2Canvas()

                        case 2:
                          canvas = _context2.sent
                          _context2.next = 5
                          return this._loadTexturedMaterial(canvas.toDataURL())

                        case 5:
                          material = _context2.sent
                          this._plane.material = material

                          this._render()

                          return _context2.abrupt("return", true)

                        case 9:
                        case "end":
                          return _context2.stop()
                      }
                    }
                  },
                  _callee2,
                  this
                )
              })
            )

            function _updateCanvas() {
              return _updateCanvas2.apply(this, arguments)
            }

            return _updateCanvas
          })()
          /**
           * Add glitch on hover handler
           */
        },
        {
          key: "_addGlitchOnHoverHandler",
          value: function _addGlitchOnHoverHandler() {
            var _this = this

            var $target =
              typeof this.props.glitchOnHover === "string"
                ? (0, _closest.default)(this, this.props.glitchOnHover)
                : this
            this._removeGlitchOnHoverFn = (0, _addEventListener.default)(
              $target,
              "mouseenter",
              function() {
                _this._startTimeout()
              }
            )
            this._removeGlitchOnHoverOutFn = (0, _addEventListener.default)(
              $target,
              "mouseleave",
              function() {
                _this._pauseTimeout()
              }
            )
          }
          /**
           * Remove glitch on hover handler
           */
        },
        {
          key: "_removeGlitchOnHoverHandler",
          value: function _removeGlitchOnHoverHandler() {
            if (this._removeGlitchOnHoverFn) this._removeGlitchOnHoverFn()
            if (this._removeGlitchOnHoverOutFn) this._removeGlitchOnHoverOutFn()
          }
          /**
           * Add in viewport change detector
           */
        },
        {
          key: "_addInViewportChangeDetector",
          value: function _addInViewportChangeDetector() {
            var _this2 = this

            this._inViewportChangeDetector = (0,
            _inViewportStatusChange.default)(
              this,
              function() {
                // start the timeout again
                _this2._startTimeout()
              },
              function() {
                // pause the timeout
                _this2._pauseTimeout()
              }
            )
          }
          /**
           * Remove the in viewport change detector
           */
        },
        {
          key: "_removeInViewportChangeDetector",
          value: function _removeInViewportChangeDetector() {
            if (this._inViewportChangeDetector) {
              this._inViewportChangeDetector.destroy()
            } // start the timeout again just in case

            this._startTimeout()
          }
          /**
           * Init hover handler
           */
        },
        {
          key: "_addHoverHandler",
          value: function _addHoverHandler() {
            var _this3 = this

            this._removeHoverHandlerFn = (0, _addEventListener.default)(
              this,
              "mouseenter",
              function() {
                // pause the timeout
                _this3._pauseTimeout()
              }
            )
            this._removeOutHandlerFn = (0, _addEventListener.default)(
              this,
              "mouseleave",
              function() {
                // start the timeout again
                _this3._startTimeout()
              }
            )
          }
          /**
           * Remove hover handler
           */
        },
        {
          key: "_removeHoverHandler",
          value: function _removeHoverHandler() {
            if (this._removeHoverHandlerFn) this._removeHoverHandlerFn()
            if (this._removeOutHandlerFn) this._removeOutHandlerFn()
          }
          /**
           * Init the resize handler
           */
        },
        {
          key: "_addResizeHandler",
          value: function _addResizeHandler() {
            var _this4 = this

            this._removeResizeHandlerFn = (0, _addEventListener.default)(
              window,
              "resize",
              (0, _debounce.default)(
                /*#__PURE__*/
                _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3() {
                    return regeneratorRuntime.wrap(
                      function _callee3$(_context3) {
                        while (1) {
                          switch ((_context3.prev = _context3.next)) {
                            case 0:
                              _this4._isResizing = true

                              _this4._renderer.setSize(
                                _this4.offsetWidth,
                                _this4.offsetHeight
                              )

                              _this4._updateCanvas()

                              setTimeout(function() {
                                _this4._isResizing = false
                              })

                            case 4:
                            case "end":
                              return _context3.stop()
                          }
                        }
                      },
                      _callee3,
                      this
                    )
                  })
                ),
                500
              )
            )
          }
          /**
           * Init the timeout timer
           */
        },
        {
          key: "_initTimeoutTimer",
          value: function _initTimeoutTimer() {
            this._timeoutTimer = new _STimer.default(
              this.props.minTimeout +
                Math.round(
                  Math.random() *
                    (this.props.maxTimeout - this.props.minTimeout)
                ),
              {
                tickCount: 1
              }
            )

            this._timeoutTimer.onTick(this._startGlitch.bind(this))
          }
        },
        {
          key: "_pauseTimeout",
          value: function _pauseTimeout() {
            this._isTimeoutStarted = false

            this._timeoutTimer.pause()
          }
          /**
           * Start a timeout iteration that will start a glitch at his end
           */
        },
        {
          key: "_startTimeout",
          value: function _startTimeout() {
            this._timeoutTimer.duration(
              this.props.minTimeout +
                Math.round(
                  Math.random() *
                    (this.props.maxTimeout - this.props.minTimeout)
                )
            )

            this._isTimeoutStarted = true

            this._timeoutTimer.start()
          }
          /**
           * Init glitch timer
           */
        },
        {
          key: "_initGlitchTimer",
          value: function _initGlitchTimer() {
            var _this5 = this

            var duration =
              this.props.minDuration +
              Math.round(
                Math.random() *
                  (this.props.maxDuration - this.props.minDuration)
              )
            this._glitchTimer = new _STimer.default(duration, {
              tickCount: (this.props.fps / 1000) * duration
            })

            this._glitchTimer.onTick(this._render.bind(this))

            this._glitchTimer.onComplete(function() {
              _this5.classList.remove("glitch")

              if (_this5._isTimeoutStarted) _this5._startTimeout()
            })
          }
          /**
           * Start a glitch iteration
           */
        },
        {
          key: "_startGlitch",
          value: function _startGlitch() {
            this.classList.add("glitch")
            var duration =
              this.props.minDuration +
              Math.round(
                Math.random() *
                  (this.props.maxDuration - this.props.minDuration)
              )

            this._glitchTimer.duration(duration)

            this._glitchTimer.tickCount((this.props.fps / 1000) * duration)

            this._glitchTimer.start()
          }
          /**
           * Transform the dom into a canvas element
           * @return    {HTMLCanvasElement}    A canvas element that contain the dom drawn on it
           */
        },
        {
          key: "_getHtml2Canvas",
          value: (function() {
            var _getHtml2Canvas2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee4() {
                var canvas
                return regeneratorRuntime.wrap(
                  function _callee4$(_context4) {
                    while (1) {
                      switch ((_context4.prev = _context4.next)) {
                        case 0:
                          _context4.next = 2
                          return (0, _html2canvas.default)(this, {
                            logging: false,
                            useCORS: true,
                            removeContainer: false,
                            ignoreElements: function ignoreElements(element) {
                              if (element.tagName.toLowerCase() === "canvas")
                                return true
                              return false
                            }
                          })

                        case 2:
                          canvas = _context4.sent
                          return _context4.abrupt("return", canvas)

                        case 4:
                        case "end":
                          return _context4.stop()
                      }
                    }
                  },
                  _callee4,
                  this
                )
              })
            )

            function _getHtml2Canvas() {
              return _getHtml2Canvas2.apply(this, arguments)
            }

            return _getHtml2Canvas
          })()
          /**
           * Init the 3d scene with light and plae
           * @param    {String}    image    urlData image to apply on the plane
           * @return    {HTMLCanvasElement}    The canvas on which the glitch will be drawn
           */
        },
        {
          key: "_initScene",
          value: (function() {
            var _initScene2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee5(image) {
                var camera,
                  scene,
                  texturedMaterial,
                  ambientLight,
                  directionalLight,
                  glitchDtSize,
                  glitchPass
                return regeneratorRuntime.wrap(
                  function _callee5$(_context5) {
                    while (1) {
                      switch ((_context5.prev = _context5.next)) {
                        case 0:
                          this._renderer = new _threeFull.WebGLRenderer()

                          this._renderer.setSize(
                            this.offsetWidth,
                            this.offsetHeight
                          )

                          this._renderer.domElement.classList.add(
                            "".concat(this.componentNameDash, "__canvas")
                          )

                          this.appendChild(this._renderer.domElement) // camera

                          camera = new _threeFull.OrthographicCamera(
                            -this.offsetWidth * 0.5,
                            this.offsetWidth * 0.5,
                            this.offsetHeight * 0.5,
                            -this.offsetHeight * 0.5,
                            1,
                            10000
                          )
                          camera.position.z = 100 // scene

                          scene = new _threeFull.Scene()
                          scene.add(camera)
                          _context5.next = 10
                          return this._loadTexturedMaterial(image)

                        case 10:
                          texturedMaterial = _context5.sent
                          // plane
                          this._plane = new _threeFull.Mesh(
                            new _threeFull.PlaneGeometry(
                              this.offsetWidth,
                              this.offsetHeight
                            ),
                            texturedMaterial
                          )
                          this._plane.overdraw = true
                          scene.add(this._plane) // add subtle ambient lighting

                          ambientLight = new _threeFull.AmbientLight(0x555555)
                          scene.add(ambientLight) // add directional light source

                          directionalLight = new _threeFull.DirectionalLight(
                            0xffffff
                          )
                          directionalLight.position.set(1, 1, 1).normalize()
                          scene.add(directionalLight)
                          this._composer = new _threeFull.EffectComposer(
                            this._renderer
                          )

                          this._composer.addPass(
                            new _threeFull.RenderPass(scene, camera)
                          )

                          glitchDtSize = 64
                          glitchPass = new _GlitchPass.default(glitchDtSize)
                          glitchPass.renderToScreen = true
                          glitchPass.goWild = true

                          this._composer.addPass(glitchPass) // resolve the init scene

                          return _context5.abrupt(
                            "return",
                            this._renderer.domElement
                          )

                        case 27:
                        case "end":
                          return _context5.stop()
                      }
                    }
                  },
                  _callee5,
                  this
                )
              })
            )

            function _initScene(_x) {
              return _initScene2.apply(this, arguments)
            }

            return _initScene
          })()
          /**
           * Render a glitch frame
           */
        },
        {
          key: "_render",
          value: function _render() {
            if (this._isResizing) return

            this._composer.render()
          }
          /**
           * Load the textured material to apply on the place
           * @param    {String}    image    The urlData of the texture to apply
           * @return    {MeshBasicMaterial}    The basic material with the texture applied on it
           */
        },
        {
          key: "_loadTexturedMaterial",
          value: (function() {
            var _loadTexturedMaterial2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee6(image) {
                var texture, texturedMaterial
                return regeneratorRuntime.wrap(
                  function _callee6$(_context6) {
                    while (1) {
                      switch ((_context6.prev = _context6.next)) {
                        case 0:
                          _context6.next = 2
                          return this._loadTexture(image)

                        case 2:
                          texture = _context6.sent
                          texturedMaterial = new _threeFull.MeshBasicMaterial({
                            map: texture
                          })
                          texturedMaterial.map.needsUpdate = true
                          return _context6.abrupt("return", texturedMaterial)

                        case 6:
                        case "end":
                          return _context6.stop()
                      }
                    }
                  },
                  _callee6,
                  this
                )
              })
            )

            function _loadTexturedMaterial(_x2) {
              return _loadTexturedMaterial2.apply(this, arguments)
            }

            return _loadTexturedMaterial
          })()
          /**
           * Load a texture
           * @param    {String}    image    The urlData of the texture to load
           * @return    {Texture}    The loaded texture to apply on a material
           */
        },
        {
          key: "_loadTexture",
          value: function _loadTexture(image) {
            return new Promise(function(resolve, reject) {
              var loader = new _threeFull.TextureLoader()
              loader.load(
                image,
                function(texture) {
                  resolve(texture)
                }, // onProgress callback currently not supported
                undefined, // onError callback
                function(err) {
                  reject(err)
                }
              )
            })
          }
        }
      ],
      [
        {
          key: "defaultCss",

          /**
           * Css
           * @protected
           */
          value: function defaultCss(componentName, componentNameDash) {
            return "\n      "
              .concat(
                componentNameDash,
                " {\n        display: block;\n        position: relative;\n      }\n      ."
              )
              .concat(
                componentNameDash,
                "__canvas {\n        display: none;\n        position: absolute;\n        top: 0; left: 0;\n        width: 100%; height: 100%;\n        pointer-events: none;\n      }\n      "
              )
              .concat(componentNameDash, ".glitch .")
              .concat(
                componentNameDash,
                "__canvas {\n        display: block;\n      }\n    "
              )
          }
        },
        {
          key: "defaultProps",

          /**
           * Default props
           * @definition    SWebComponent.defaultProps
           * @protected
           */
          get: function get() {
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
              glitchOnHover: false,

              /**
               * Wait till images are fully loaded to render the glitch canvas
               * @prop
               * @type    {Boolean}
               */
              waitOnImages: true
            }
          }
          /**
           * Mount dependencies
           * @definition    SWebComponent.mountDependencies
           * @protected
           */
        },
        {
          key: "mountDependencies",
          get: function get() {
            return [
              function() {
                var _this6 = this

                return new Promise(function(resolve) {
                  if (_this6.ownerDocument !== window.document) return

                  if (_this6.props.waitOnImages) {
                    var $backgroundImageElms = (0,
                    _querySelectorAllWithStyle.default)(
                      "*",
                      {
                        backgroundImage: /^url/
                      },
                      {
                        rootNode: _this6
                      }
                    )
                    var imagesPromises = []
                    $backgroundImageElms.forEach(function($backgroundImageElm) {
                      imagesPromises.push(
                        (0, _backgroundImageLoaded.default)($backgroundImageElm)
                      )
                    })
                    imagesPromises.push(
                      (0, _imagesLoaded.default)(
                        _this6.querySelectorAll("img[src]")
                      )
                    )
                    resolve(Promise.all(imagesPromises))
                    return
                  }

                  resolve()
                })
              }
            ]
          }
        }
      ]
    )

    return SGlitchComponent
  })(_SWebComponent2.default)

exports.default = SGlitchComponent
