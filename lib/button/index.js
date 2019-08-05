'use strict';

var __extends =
  (void 0 && (void 0).__extends) ||
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

      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();

var __importStar =
  (void 0 && (void 0).__importStar) ||
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

var React = __importStar(require('react')); // 'ButtonProps' describes the shape of props.
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
//# sourceMappingURL=index.js.map
