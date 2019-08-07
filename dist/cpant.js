/*!
 *
 * cpant v1.0.1
 *
 * Mr.pz write ui framework from 0,嘻嘻
 *
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('react'));
  else if (typeof define === 'function' && define.amd) define(['react'], factory);
  else if (typeof exports === 'object') exports['cpant'] = factory(require('react'));
  else root['cpant'] = factory(root['React']);
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__) {
  return /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}; // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports;
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {},
        /******/
      }); // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__,
      ); // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true; // Return the exports of the module
      /******/
      /******/ /******/ return module.exports;
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
        /******/
      }
      /******/
    }; // define __esModule on exports
    /******/
    /******/ /******/ __webpack_require__.r = function(exports) {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
    /******/
    /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
      value,
      mode,
    ) {
      /******/ if (mode & 1) value = __webpack_require__(value);
      /******/ if (mode & 8) return value;
      /******/ if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
      /******/ var ns = Object.create(null);
      /******/ __webpack_require__.r(ns);
      /******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value });
      /******/ if (mode & 2 && typeof value != 'string')
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function(key) {
              return value[key];
            }.bind(null, key),
          );
      /******/ return ns;
      /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module['default'];
            }
          : /******/ function getModuleExports() {
              return module;
            };
      /******/ __webpack_require__.d(getter, 'a', getter);
      /******/ return getter;
      /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 0));
    /******/
  })(
    /************************************************************************/
    /******/ {
      /***/ './components sync recursive ^\\.\\/[^_][\\w-]+\\/style\\/index\\.tsx?$':
        /*!**************************************************************!*\
  !*** ./components sync ^\.\/[^_][\w-]+\/style\/index\.tsx?$ ***!
  \**************************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          var map = {
            './button/style/index.tsx': './components/button/style/index.tsx',
            './version/style/index.tsx': './components/version/style/index.tsx',
          };

          function webpackContext(req) {
            var id = webpackContextResolve(req);
            return __webpack_require__(id);
          }
          function webpackContextResolve(req) {
            if (!__webpack_require__.o(map, req)) {
              var e = new Error("Cannot find module '" + req + "'");
              e.code = 'MODULE_NOT_FOUND';
              throw e;
            }
            return map[req];
          }
          webpackContext.keys = function webpackContextKeys() {
            return Object.keys(map);
          };
          webpackContext.resolve = webpackContextResolve;
          module.exports = webpackContext;
          webpackContext.id =
            './components sync recursive ^\\.\\/[^_][\\w-]+\\/style\\/index\\.tsx?$';

          /***/
        },

      /***/ './components/button/index.tsx':
        /*!*************************************!*\
  !*** ./components/button/index.tsx ***!
  \*************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          'use strict';

          var __extends =
            (this && this.__extends) ||
            (function() {
              var _extendStatics = function extendStatics(d, b) {
                _extendStatics =
                  Object.setPrototypeOf ||
                  ({
                    __proto__: [],
                  } instanceof Array &&
                    function(d, b) {
                      d.__proto__ = b;
                    }) ||
                  function(d, b) {
                    for (var p in b) {
                      if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                  };

                return _extendStatics(d, b);
              };

              return function(d, b) {
                _extendStatics(d, b);

                function __() {
                  this.constructor = d;
                }

                d.prototype =
                  b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
              };
            })();

          var __importStar =
            (this && this.__importStar) ||
            function(mod) {
              if (mod && mod.__esModule) return mod;
              var result = {};
              if (mod != null)
                for (var k in mod) {
                  if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
                }
              result['default'] = mod;
              return result;
            };

          Object.defineProperty(exports, '__esModule', {
            value: true,
          });

          var React = __importStar(__webpack_require__(/*! react */ 'react')); // 'ButtonProps' describes the shape of props.
          // State is never set so we use the '{}' type.

          var Button =
            /** @class */
            (function(_super) {
              __extends(Button, _super);

              function Button() {
                var _this = (_super !== null && _super.apply(this, arguments)) || this;

                _this.name = '1223234';
                return _this;
              }

              Button.prototype.render = function() {
                return React.createElement(
                  'h1',
                  {
                    className: 'test',
                  },
                  'Button from ',
                  this.props.compiler,
                  ' and ',
                  this.props.framework,
                  '! ',
                  this.name,
                );
              };

              return Button;
            })(React.Component);

          exports['default'] = Button;

          /***/
        },

      /***/ './components/button/style/index.less':
        /*!********************************************!*\
  !*** ./components/button/style/index.less ***!
  \********************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          // extracted by mini-css-extract-plugin
          /***/
        },

      /***/ './components/button/style/index.tsx':
        /*!*******************************************!*\
  !*** ./components/button/style/index.tsx ***!
  \*******************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          'use strict';

          Object.defineProperty(exports, '__esModule', {
            value: true,
          });

          __webpack_require__(/*! ./index.less */ './components/button/style/index.less');

          /***/
        },

      /***/ './components/index.tsx':
        /*!******************************!*\
  !*** ./components/index.tsx ***!
  \******************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          'use strict';

          Object.defineProperty(exports, '__esModule', {
            value: true,
          });

          var button_1 = __webpack_require__(/*! ./button */ './components/button/index.tsx');

          exports.Button = button_1['default'];

          /***/
        },

      /***/ './components/style/index.less':
        /*!*************************************!*\
  !*** ./components/style/index.less ***!
  \*************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          // extracted by mini-css-extract-plugin
          /***/
        },

      /***/ './components/version/style/index.tsx':
        /*!********************************************!*\
  !*** ./components/version/style/index.tsx ***!
  \********************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          'use strict';

          Object.defineProperty(exports, '__esModule', {
            value: true,
          }); // empty file prevent babel-plugin-import error

          __webpack_require__(/*! ../../style/index.less */ './components/style/index.less');

          /***/
        },

      /***/ './index.js':
        /*!******************!*\
  !*** ./index.js ***!
  \******************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* eslint no-console:0 */
          // 这个文件解决了没有自动生成cpant.css的
          function camelCase(name) {
            return (
              name.charAt(0).toUpperCase() +
              name.slice(1).replace(/-(\w)/g, function(m, n) {
                return n.toUpperCase();
              })
            );
          } // Just import style for https://github.com/ant-design/ant-design/issues/3745

          var req = __webpack_require__(
            './components sync recursive ^\\.\\/[^_][\\w-]+\\/style\\/index\\.tsx?$',
          );

          req.keys().forEach(function(mod) {
            var v = req(mod);

            if (v && v['default']) {
              v = v['default'];
            }

            var match = mod.match(/^\.\/([^_][\w-]+)\/index\.tsx?$/);

            if (match && match[1]) {
              if (match[1] === 'message' || match[1] === 'notification') {
                // message & notification should not be capitalized
                exports[match[1]] = v;
              } else {
                exports[camelCase(match[1])] = v;
              }
            }
          });
          module.exports = __webpack_require__(/*! ./components */ './components/index.tsx');

          /***/
        },

      /***/ 0:
        /*!*********************!*\
  !*** multi ./index ***!
  \*********************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          module.exports = __webpack_require__(/*! ./index */ './index.js');

          /***/
        },

      /***/ react:
        /*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
  \**************************************************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

          /***/
        },

      /******/
    },
  );
});
//# sourceMappingURL=cpant.js.map
