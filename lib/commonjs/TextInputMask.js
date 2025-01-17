"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNativePaper = require("react-native-paper");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const splitCharacters = ['-', '/', '.', '年', ' '];
function detectCharacter(mask) {
  const c = splitCharacters.find(ch => mask.includes(ch));
  return c || '';
}
function escapeForRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function TextInputWithMask(_ref, ref) {
  let {
    inputButton,
    onChangeText,
    onChange,
    value,
    mask,
    disabled,
    ...rest
  } = _ref;
  const [controlledValue, setControlledValue] = React.useState(value || '');
  const onInnerChange = text => {
    const splitCharacter = detectCharacter(mask);
    const maskParts = mask.split(splitCharacter);
    let trimmedText = text.trim();
    const format = maskParts[0].toLowerCase() + splitCharacter + maskParts[1].toLowerCase() + splitCharacter + maskParts[2].toLowerCase();
    const match = new RegExp(format.replace(/(\w+)\W(\w+)\W(\w+)/, '^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*').replace(/m|d|y/g, '\\d'));
    const replaceValue = format.match(/\W/);
    const replace = `$1${splitCharacter}$2${splitCharacter}$3$4`.replace(new RegExp(escapeForRegExp(splitCharacter), 'g'), replaceValue ?? '');
    const isBackSpace = controlledValue.length > trimmedText.length;
    if (!isBackSpace) {
      trimmedText = trimmedText.replace(/(^|\W)(?=\d\W)/g, '$10').replace(match, replace).replace(/(\W)+/g, '$1');
    }
    if (trimmedText.length === mask.length) {
      onChangeText && onChangeText(trimmedText);
    }
    setControlledValue(trimmedText);
  };
  React.useEffect(() => {
    setControlledValue(value || '');
  }, [value]);
  return /*#__PURE__*/React.createElement(_reactNativePaper.TextInput, _extends({
    ref: ref
  }, rest, {
    disabled: disabled,
    value: controlledValue,
    onChangeText: onInnerChange,
    onChange: e => {
      onChange && onChange(e);
    },
    maxLength: 10,
    right: inputButton
  }));
}
var _default = /*#__PURE__*/React.forwardRef(TextInputWithMask);
exports.default = _default;
//# sourceMappingURL=TextInputMask.js.map