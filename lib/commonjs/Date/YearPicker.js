"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = YearPicker;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativePaper = require("react-native-paper");
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ITEM_HEIGHT = 62;
function YearPicker(_ref) {
  let {
    selectedYear,
    selectingYear,
    onPressYear,
    startYear,
    endYear
  } = _ref;
  const flatList = React.useRef(null);
  const years = (0, _utils.range)(isNaN(startYear) ? 1800 : startYear, isNaN(endYear) ? 2200 : endYear);

  // scroll to selected year
  React.useEffect(() => {
    if (flatList.current && selectedYear) {
      const indexToGo = selectedYear - startYear;
      flatList.current.scrollToOffset({
        offset: indexToGo / 3 * ITEM_HEIGHT - ITEM_HEIGHT,
        animated: false
      });
    }
  }, [flatList, selectedYear, startYear]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, styles.root, {
      backgroundColor: _utils.passedTheme.colors.surface
    }, selectingYear ? styles.opacity1 : styles.opacity0],
    pointerEvents: selectingYear ? 'auto' : 'none'
  }, /*#__PURE__*/React.createElement(_reactNative.FlatList, {
    ref: flatList,
    style: styles.list,
    data: years,
    renderScrollComponent: sProps => {
      return /*#__PURE__*/React.createElement(_reactNative.ScrollView, sProps);
    },
    renderItem: _ref2 => {
      let {
        item
      } = _ref2;
      return /*#__PURE__*/React.createElement(Year, {
        year: item,
        selected: selectedYear === item,
        onPressYear: onPressYear
      });
    },
    keyExtractor: item => `${item}`,
    numColumns: 3
  }));
}
function YearPure(_ref3) {
  let {
    year,
    selected,
    onPressYear
  } = _ref3;
  let textFont = _utils.passedTheme !== null && _utils.passedTheme !== void 0 && _utils.passedTheme.isV3 ? _utils.passedTheme.fonts.bodyLarge : _utils.passedTheme.fonts.medium;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.year
  }, /*#__PURE__*/React.createElement(_reactNativePaper.TouchableRipple, {
    onPress: () => onPressYear(year),
    accessibilityRole: "button",
    accessibilityLabel: String(year),
    style: styles.yearButton
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.yearInner, selected ? {
      backgroundColor: _utils.passedTheme.colors.primary
    } : null]
  }, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    maxFontSizeMultiplier: 1.5,
    style: [styles.yearLabel, selected ?
    // eslint-disable-next-line react-native/no-inline-styles
    {
      color: _utils.passedTheme.isV3 ? _utils.passedTheme.colors.onPrimary : '#fff'
    } : {
      color: _utils.passedTheme.isV3 ? _utils.passedTheme.colors.onSurfaceVariant : _utils.passedTheme.colors.onSurface
    }, {
      ...textFont
    }],
    selectable: false
  }, year))));
}
const Year = /*#__PURE__*/React.memo(YearPure);
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    top: 56,
    zIndex: 100
  },
  list: {
    flex: 1
  },
  year: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    height: ITEM_HEIGHT,
    justifyContent: 'center'
  },
  yearButton: {
    borderRadius: 46 / 2,
    overflow: 'hidden'
  },
  yearInner: {
    borderRadius: 46 / 2,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center'
  },
  yearLabel: {
    fontSize: 16
  },
  opacity0: {
    opacity: 0
  },
  opacity1: {
    opacity: 1
  }
});
//# sourceMappingURL=YearPicker.js.map