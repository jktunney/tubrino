'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _idgen = require('./idgen');

var _idgen2 = _interopRequireDefault(_idgen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).call(this, props));

    _this.renderTrigger = _this.renderTrigger.bind(_this);
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var trigger = _props.trigger;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['trigger', 'children']);

      var idx = 'dropdown_' + (0, _idgen2.default)();
      return _react2.default.createElement(
        'span',
        null,
        this.renderTrigger(idx),
        _react2.default.createElement(
          'ul',
          { className: 'dropdown-content', id: idx },
          children
        )
      );
    }
  }, {
    key: 'renderTrigger',
    value: function renderTrigger(idx) {
      var trigger = this.props.trigger;
      return _react2.default.cloneElement(trigger, {
        className: 'dropdown-button',
        'data-beloworigin': true,
        'data-activates': idx
      });
    }
  }]);

  return Dropdown;
}(_react2.default.Component);

Dropdown.propTypes = {
  /**
   * The button to trigger the dropdown
   */
  trigger: _react2.default.PropTypes.node.isRequired,
  /**
   * 	If true, the dropdown will show over the activator. Default: false
   */
  overorigin: _react2.default.PropTypes.bool
};

Dropdown.defaultProps = {
  overorigin: false
};

exports.default = Dropdown;