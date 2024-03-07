import Hammer from 'hammerjs';

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

var script = {
  name: 'VueBottomSheetVue2',
  props: {
    overlay: {
      type: Boolean,
      default: true
    },
    overlayColor: {
      type: String,
      default: '#0000004D'
    },
    maxWidth: {
      type: Number,
      default: 640
    },
    maxHeight: {
      type: Number,
      default: undefined
    },
    overlayClickClose: {
      type: Boolean,
      default: true
    },
    canSwipe: {
      type: Boolean,
      default: true
    },
    closeHeightPercent: {
      type: Number,
      default: 100
    },
    closeHeightOffset: {
      type: Number,
      default: 0
    },
    initSheetHeight: {
      type: Number,
      default: undefined
    },
    zIndex: {
      type: Number,
      default: 99999
    },
    customClass: {
      type: String,
      default: ''
    },
    dragColor: {
      type: String,
      default: '#333333'
    }
  },
  data: function data() {
    return {
      showSheet: false,
      translateValue: this.closeHeightPercent,
      isDragging: false,
      contentScroll: 0,
      sheetHeight: 0
    };
  },
  methods: {
    initHeight: function initHeight() {
      var _this$initSheetHeight;
      this.sheetHeight = (_this$initSheetHeight = this.initSheetHeight) !== null && _this$initSheetHeight !== void 0 ? _this$initSheetHeight : this.$refs.bottomSheetHeader.offsetHeight + this.$refs.bottomSheetMain.offsetHeight + this.$refs.bottomSheetFooter.offsetHeight;
    },
    clickOnOverlayHandler: function clickOnOverlayHandler() {
      if (this.overlayClickClose) {
        this.close();
      }
    },
    dragHandler: function dragHandler(event, type) {
      if (this.canSwipe) {
        this.isDragging = true;
        var preventDefault = function preventDefault(e) {
          e.preventDefault();
        };
        if (type === 'main') {
          this.contentScroll = this.$refs.bottomSheetMain.scrollTop;
          document.documentElement.style.overflowY = 'hidden';
          document.documentElement.style.overscrollBehavior = 'none';
        }
        if (this.showSheet) {
          if (event.deltaY > 0) {
            if (type === 'main' && event.type === 'panup') {
              this.translateValue = this.pixelToVh(event.deltaY);
              if (event.cancelable) {
                this.$refs.bottomSheetMain.addEventListener('touchmove', preventDefault);
              }
            }
            if (type === 'main' && event.type === 'pandown' && this.contentScroll === 0) {
              this.translateValue = this.pixelToVh(event.deltaY);
            }
            if (type === 'area') {
              this.translateValue = this.pixelToVh(event.deltaY);
            }
            if (event.type === 'panup') {
              this.$emit('dragging-up');
            }
            if (event.type === 'pandown') {
              this.$emit('dragging-down');
            }
          }
        } else {
          if (type === 'main' && event.type === 'panup') {
            if (event.cancelable) {
              this.$refs.bottomSheetMain.addEventListener('touchmove', preventDefault);
            }
            var tslVal = this.closeHeightPercent + this.pixelToVh(event.deltaY);
            if (tslVal >= 0) {
              this.translateValue = tslVal;
            }
          }
          if (type === 'main' && event.type === 'pandown' && this.contentScroll === 0) {
            this.translateValue = this.closeHeightPercent + this.pixelToVh(event.deltaY);
          }
          if (type === 'area') {
            var _tslVal = this.closeHeightPercent + this.pixelToVh(event.deltaY);
            if (_tslVal >= 0) {
              this.translateValue = _tslVal;
            }
          }
          if (event.type === 'panup') {
            this.$emit('dragging-up');
          }
          if (event.type === 'pandown') {
            this.$emit('dragging-down');
          }
        }
        if (event.isFinal) {
          this.$refs.bottomSheetMain.removeEventListener('touchmove', preventDefault);
          if (type === 'main') {
            this.contentScroll = this.$refs.bottomSheetMain.scrollTop;
          }
          this.isDragging = false;
          if (this.showSheet) {
            if (this.pixelToVh(event.deltaY) >= 15 && this.contentScroll === 0 || this.pixelToVh(event.deltaY) >= 15 && type === 'area') {
              this.close();
            } else {
              this.open();
            }
          } else {
            if (this.pixelToVh(event.deltaY) <= -5) {
              this.open();
            } else {
              this.close();
            }
          }
        }
      }
    },
    pixelToVh: function pixelToVh(pixel) {
      var height = this.maxHeight && this.maxHeight <= this.sheetHeight ? this.maxHeight : this.sheetHeight;
      return pixel / height * 100;
    },
    close: function close() {
      var _this = this;
      this.showSheet = false;
      this.translateValue = this.closeHeightPercent;
      setTimeout(function () {
        document.documentElement.style.overflowY = 'auto';
        document.documentElement.style.overscrollBehavior = '';
        _this.$emit('closed');
      }, this.transitionDuration * 1000);
    },
    open: function open() {
      this.translateValue = 0;
      document.documentElement.style.overflowY = 'hidden';
      document.documentElement.style.overscrollBehavior = 'none';
      this.showSheet = true;
      this.$emit('opened');
    },
    keyupHandler: function keyupHandler(event) {
      var isFocused = function isFocused(element) {
        return document.activeElement === element;
      };
      var isSheetElementFocused = this.$refs.bottomSheet.contains(event.target) && isFocused(event.target);
      if (event.key === 'Escape' && !isSheetElementFocused) {
        this.close();
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('keyup', this.keyupHandler);
  },
  mounted: function mounted() {
    var _this2 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setTimeout(function () {
              _this2.initHeight();
              window.addEventListener('keyup', _this2.keyupHandler);

              /**
               * Create instances of Hammerjs
               */
              var hammerAreaInstance = new Hammer(_this2.$refs.bottomSheetDraggableArea, {
                inputClass: Hammer.TouchMouseInput,
                recognizers: [[Hammer.Pan, {
                  direction: Hammer.DIRECTION_VERTICAL
                }]]
              });
              var hammerMainInstance = new Hammer(_this2.$refs.bottomSheetMain, {
                inputClass: Hammer.TouchMouseInput,
                recognizers: [[Hammer.Pan, {
                  direction: Hammer.DIRECTION_VERTICAL
                }]]
              });

              /**
               * Set events and handlers to hammerjs instances
               */
              hammerAreaInstance.on('panstart panup pandown panend', function (e) {
                _this2.dragHandler(e, 'area');
              });
              hammerMainInstance.on('panstart panup pandown panend', function (e) {
                _this2.dragHandler(e, 'main');
              });
            }, 100);
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  watch: {
    initSheetHeight: function initSheetHeight(newVal, oldVal) {
      this.initHeight();
    }
  },
  computed: {
    sheetContentClasses: function sheetContentClasses() {
      return ['bottom-sheet__content', {
        'bottom-sheet__content--fullscreen': this.sheetHeight >= window.innerHeight,
        'bottom-sheet__content--dragging': this.isDragging
      }, this.customClass];
    },
    maxWidthString: function maxWidthString() {
      return "".concat(this.maxWidth, "px");
    },
    maxHeightString: function maxHeightString() {
      return this.maxHeight ? "".concat(this.maxHeight, "px") : 'inherit';
    },
    translateValueString: function translateValueString() {
      if (this.showSheet) {
        return "translate3d(0, ".concat(this.translateValue, "%, 0)");
      }
      return "translate3d(0, calc(".concat(this.translateValue, "% + -").concat(this.closeHeightOffset, "px), 0)");
    },
    sheetHeightString: function sheetHeightString() {
      return this.sheetHeight && this.sheetHeight > 0 ? "".concat(this.sheetHeight + 1, "px") : 'auto';
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    ref: "bottomSheet",
    staticClass: "bottom-sheet",
    style: {
      zIndex: _vm.zIndex
    },
    attrs: {
      "aria-hidden": !_vm.showSheet,
      "role": "dialog"
    }
  }, [_c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_vm.overlay && _vm.showSheet ? _c('div', {
    staticClass: "bottom-sheet__overlay",
    style: {
      backgroundColor: _vm.overlayColor
    },
    on: {
      "click": _vm.clickOnOverlayHandler
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    ref: "bottomSheetContent",
    class: _vm.sheetContentClasses,
    style: {
      maxWidth: _vm.maxWidthString,
      maxHeight: _vm.maxHeightString,
      transform: _vm.translateValueString,
      height: _vm.sheetHeightString
    }
  }, [_c('header', {
    ref: "bottomSheetHeader",
    staticClass: "bottom-sheet__header"
  }, [_c('div', {
    ref: "bottomSheetDraggableArea",
    staticClass: "bottom-sheet__draggable-area"
  }, [_vm._t("drag", function () {
    return [_c('div', {
      staticClass: "bottom-sheet__draggable-thumb",
      style: {
        backgroundColor: _vm.dragColor
      }
    })];
  })], 2), _vm._v(" "), _vm._t("header")], 2), _vm._v(" "), _c('main', {
    ref: "bottomSheetMain",
    staticClass: "bottom-sheet__main",
    style: {
      overflowY: _vm.showSheet ? 'auto' : 'hidden'
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _c('footer', {
    ref: "bottomSheetFooter",
    staticClass: "bottom-sheet__footer"
  }, [_vm._t("footer")], 2)])], 1);
};
var __vue_staticRenderFns__ = [];

/* style */
var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-894aa802_0", {
    source: ".bottom-sheet[data-v-894aa802]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;position:fixed;top:0;left:0;right:0;bottom:0;-webkit-transition:visibility .5s;transition:visibility .5s}.bottom-sheet *[data-v-894aa802]{-webkit-box-sizing:border-box;box-sizing:border-box}.bottom-sheet[aria-hidden=false][data-v-894aa802]{visibility:visible}.bottom-sheet[aria-hidden=true][data-v-894aa802]{pointer-events:none}.bottom-sheet__overlay[data-v-894aa802]{position:absolute;top:0;left:0;right:0;bottom:0;z-index:-1}.bottom-sheet__content[data-v-894aa802]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;border-radius:16px 16px 0 0;background:#fff;overflow-y:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:all;width:100%}.bottom-sheet__content--fullscreen[data-v-894aa802]{border-radius:0}.bottom-sheet__content[data-v-894aa802]:not(.bottom-sheet__content--dragging){-webkit-transition:.5s ease;transition:.5s ease}.bottom-sheet__draggable-area[data-v-894aa802]{width:100%;margin:auto;padding:16px;cursor:-webkit-grab;cursor:grab}.bottom-sheet__draggable-thumb[data-v-894aa802]{width:40px;height:4px;background:#333;border-radius:8px;margin:0 auto}.bottom-sheet__main[data-v-894aa802]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;overflow-y:scroll;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-overflow-scrolling:touch;-ms-touch-action:auto!important;touch-action:auto!important}.bottom-sheet__main[data-v-894aa802]::-webkit-scrollbar{height:8px;width:8px}.bottom-sheet__main[data-v-894aa802]::-webkit-scrollbar-corner{display:none}.bottom-sheet__main[data-v-894aa802]:hover::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,.2);border-radius:8px}.bottom-sheet__main[data-v-894aa802]::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,0)}.bottom-sheet__footer[data-v-894aa802]:empty{display:none}.fade-enter-active[data-v-894aa802],.fade-leave-active[data-v-894aa802]{-webkit-transition:opacity .5s;transition:opacity .5s}.fade-enter[data-v-894aa802],.fade-leave-to[data-v-894aa802]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__ = "data-v-894aa802";
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);
var component = __vue_component__;

// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry_esm = /*#__PURE__*/(function () {
  // Get component instance
  var installable = component;

  // Attach install function executed by Vue.use()
  installable.install = function (Vue) {
    Vue.component('VueBottomSheetVue2', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
