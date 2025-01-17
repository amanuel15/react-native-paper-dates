"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNativePaper = require("react-native-paper");
var _DatePickerModal = _interopRequireDefault(require("./DatePickerModal"));
var _utils = require("../utils");
var _DatePickerInputWithoutModal = _interopRequireDefault(require("./DatePickerInputWithoutModal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function DatePickerInput(_ref, ref) {
  let {
    withModal = true,
    calendarIcon = 'calendar',
    ...rest
  } = _ref;
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const onChangeRef = (0, _utils.useLatest)(rest.onChange);
  const onInnerConfirm = React.useCallback(_ref2 => {
    let {
      date
    } = _ref2;
    setVisible(false);
    onChangeRef.current(date);
  }, [setVisible, onChangeRef]);
  return /*#__PURE__*/React.createElement(_DatePickerInputWithoutModal.default, _extends({
    ref: ref
  }, rest, {
    inputButton: withModal ? /*#__PURE__*/React.createElement(_reactNativePaper.TextInput.Icon, {
      size: 24,
      icon: calendarIcon,
      disabled: rest.disabled,
      onPress: () => setVisible(true)
    }) : null
    // eslint-disable-next-line react/no-unstable-nested-components
    ,
    modal: _ref3 => {
      let {
        value,
        locale,
        inputMode,
        validRange,
        saveLabel,
        saveLabelDisabled,
        uppercase,
        startYear,
        endYear,
        inputEnabled,
        disableStatusBarPadding
      } = _ref3;
      return withModal ? /*#__PURE__*/React.createElement(_DatePickerModal.default, {
        date: value,
        mode: "single",
        visible: visible,
        onDismiss: onDismiss,
        onConfirm: onInnerConfirm,
        locale: locale,
        dateMode: inputMode,
        validRange: validRange,
        saveLabel: saveLabel,
        saveLabelDisabled: saveLabelDisabled ?? false,
        uppercase: uppercase ?? true,
        startYear: startYear ?? 1800,
        endYear: endYear ?? 2200,
        inputEnabled: inputEnabled,
        disableStatusBarPadding: disableStatusBarPadding ?? false
      }) : null;
    }
  }));
}
var _default = /*#__PURE__*/React.forwardRef(DatePickerInput);
exports.default = _default;
//# sourceMappingURL=DatePickerInput.js.map