import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, TouchableRipple } from 'react-native-paper';
import Day, { EmptyDay } from './Day';
import { addMonths, areDatesOnSameDay, daySize, getDaysInMonth, getFirstDayOfMonth, getRealIndex, getGridCount, isDateBetween, gridCounts, showWeekDay, startAtIndex, beginOffset, estimatedMonthHeight, useRangeChecker } from './dateUtils';
import { getCalendarHeaderHeight } from './CalendarHeader';
import { dayNamesHeight } from './DayNames';
import { passedTheme, useTextColorOnPrimary } from '../utils';
function Month(props) {
  const {
    index,
    mode,
    date,
    dates,
    startDate,
    endDate,
    onPressYear,
    selectingYear,
    onPressDate,
    scrollMode,
    primaryColor,
    selectColor,
    roundness,
    disableWeekDays,
    locale,
    validRange
  } = props;
  const textColorOnPrimary = useTextColorOnPrimary();
  const realIndex = getRealIndex(index);
  const isHorizontal = scrollMode === 'horizontal';
  const {
    isDisabled,
    isWithinValidRange
  } = useRangeChecker(validRange);
  const {
    monthName,
    month,
    year
  } = React.useMemo(() => {
    const md = addMonths(new Date(), realIndex);
    const y = md.getFullYear();
    const m = md.getMonth();
    const formatter = new Intl.DateTimeFormat(locale, {
      month: 'long'
    });
    return {
      monthName: formatter.format(md),
      month: m,
      year: y
    };
  }, [realIndex, locale]);
  const grid = React.useMemo(() => {
    const today = new Date();
    const daysInMonth = getDaysInMonth({
      year,
      month
    });
    const dayOfWeek = getFirstDayOfMonth({
      year,
      month
    });
    const emptyDays = dayOfWeek;
    return monthGrid(index).map(_ref => {
      let {
        days,
        weekGrid
      } = _ref;
      return {
        weekIndex: weekGrid,
        generatedDays: days.map((_, dayIndex) => {
          const isFirstWeek = weekGrid === 0;
          const realDayIndex = emptyDays - dayIndex;
          const beforeWeekDay = isFirstWeek && realDayIndex > 0;
          const dayOfMonth = weekGrid * 7 + dayIndex - emptyDays + 1;
          const afterWeekDay = dayOfMonth > daysInMonth;
          const day = new Date(year, month, dayOfMonth);
          const isToday = areDatesOnSameDay(day, today);
          let inRange = false;
          let disabled = isDisabled(day);
          let selected = false;
          let leftCrop = dayOfMonth === 1;
          let rightCrop = dayOfMonth === daysInMonth;
          const isFirstDayOfMonth = dayOfMonth === 1;
          const isLastDayOfMonth = dayOfMonth === daysInMonth;
          if (mode === 'range') {
            const selectedStartDay = areDatesOnSameDay(day, startDate);
            const selectedEndDay = areDatesOnSameDay(day, endDate);
            selected = selectedStartDay || selectedEndDay;
            inRange = isDateBetween(day, {
              startDate,
              endDate
            });
            if (selectedStartDay) {
              leftCrop = true;
            }
            if (selectedEndDay) {
              rightCrop = true;
            }
            if (dayIndex === 0 && !selectedStartDay) {
              leftCrop = false;
            }
            if (dayIndex === 6 && !selectedEndDay) {
              rightCrop = false;
            }
            if (isFirstDayOfMonth && selectedEndDay || isLastDayOfMonth && selectedStartDay) {
              inRange = false;
            }
          } else if (mode === 'multiple') {
            const safeDates = dates || [];
            selected = safeDates.some(d => areDatesOnSameDay(day, d));
            const yesterday = new Date(year, month, dayOfMonth - 1);
            const tomorrow = new Date(year, month, dayOfMonth + 1);
            const yesterdaySelected = safeDates.some(d => areDatesOnSameDay(d, yesterday));
            const tomorrowSelected = safeDates.some(d => areDatesOnSameDay(d, tomorrow));
            if (selected) {
              if (tomorrowSelected && yesterdaySelected) {
                inRange = true;
              }
              if (tomorrowSelected && !yesterdaySelected) {
                inRange = true;
                leftCrop = true;
              }
              if (yesterdaySelected && !tomorrowSelected) {
                inRange = true;
                rightCrop = true;
              }
              if (isFirstDayOfMonth && !tomorrowSelected) {
                inRange = false;
              }
              if (isLastDayOfMonth && !yesterdaySelected) {
                inRange = false;
              }
              if (inRange && !leftCrop && !rightCrop) {
                selected = false;
              }
            }
          } else if (mode === 'single') {
            selected = areDatesOnSameDay(day, date);
          }
          const isWithinOptionalValidRange = isWithinValidRange(day);
          if (inRange && !disabled) {
            disabled = false;
          }
          if (!isWithinOptionalValidRange) {
            disabled = true;
          }
          return {
            beforeWeekDay,
            afterWeekDay,
            year,
            month,
            dayOfMonth,
            dayIndex,
            mode,
            selected,
            inRange,
            leftCrop,
            rightCrop,
            isToday,
            disabled
          };
        })
      };
    });
  }, [year, month, index, isDisabled, mode, isWithinValidRange, startDate, endDate, dates, date]);
  let textFont = passedTheme !== null && passedTheme !== void 0 && passedTheme.isV3 ? passedTheme.fonts.titleSmall : passedTheme.fonts.medium;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.month, {
      height: getMonthHeight(scrollMode, index)
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.monthHeader, isHorizontal ? {
      marginTop: monthHeaderSingleMarginTop,
      marginBottom: monthHeaderSingleMarginBottom
    } : null]
  }, /*#__PURE__*/React.createElement(TouchableRipple, {
    disabled: !isHorizontal,
    onPress: isHorizontal ? () => onPressYear(year) : undefined,
    accessibilityRole: "button",
    accessibilityLabel: `${monthName} ${year}`,
    style: [styles.yearButton, {
      borderRadius: roundness
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.yearButtonInner, {
      borderRadius: roundness
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    maxFontSizeMultiplier: 1.5,
    style: [styles.monthLabel, {
      ...textFont,
      color: passedTheme.isV3 ? passedTheme.colors.onSurfaceVariant : passedTheme.colors.onSurface
    }],
    selectable: false
  }, monthName, " ", year), /*#__PURE__*/React.createElement(View, {
    style: isHorizontal ? styles.opacity1 : styles.opacity0
  }, /*#__PURE__*/React.createElement(IconButton, {
    onPress: isHorizontal ? () => onPressYear(year) : undefined,
    icon: selectingYear ? passedTheme.isV3 ? 'menu-up' : 'chevron-up' : passedTheme.isV3 ? 'menu-down' : 'chevron-down'
  }))))), grid.map(_ref2 => {
    let {
      weekIndex,
      generatedDays
    } = _ref2;
    return /*#__PURE__*/React.createElement(View, {
      style: styles.week,
      key: weekIndex
    }, generatedDays.filter(gd => showWeekDay(gd.dayIndex, disableWeekDays)).map(gd => gd.beforeWeekDay || gd.afterWeekDay ? /*#__PURE__*/React.createElement(EmptyDay, {
      key: gd.dayIndex
    }) : /*#__PURE__*/React.createElement(Day, {
      key: gd.dayIndex,
      theme: passedTheme,
      day: gd.dayOfMonth,
      month: gd.month,
      year: gd.year,
      selected: gd.selected,
      inRange: gd.inRange,
      leftCrop: gd.leftCrop,
      rightCrop: gd.rightCrop,
      onPressDate: onPressDate,
      isToday: gd.isToday,
      selectColor: selectColor,
      primaryColor: primaryColor,
      disabled: gd.disabled,
      textColorOnPrimary: textColorOnPrimary
    })));
  }));
}
export const weekMargin = 6;
export const weekSize = daySize + weekMargin;
export const montHeaderHeight = 56;
export const monthHeaderSingleMarginTop = 4;
export const monthHeaderSingleMarginBottom = 8 + 44 + 12;
export const monthHeaderSingleHeight = monthHeaderSingleMarginTop + monthHeaderSingleMarginBottom;
const styles = StyleSheet.create({
  week: {
    flexDirection: 'row',
    marginBottom: weekMargin,
    height: daySize
  },
  month: {},
  monthHeader: {
    height: montHeaderHeight,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  monthLabel: {
    fontSize: 14,
    opacity: 0.7
  },
  yearButton: {
    alignSelf: 'flex-start',
    marginLeft: 6
  },
  yearButtonInner: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  opacity0: {
    opacity: 0
  },
  opacity1: {
    opacity: 1
  }
});
const monthGrid = index => {
  return Array(getGridCount(index)).fill(null).map((_, weekGrid) => {
    const days = Array(7).fill(null);
    return {
      weekGrid,
      days
    };
  });
};
function getIndexCount(index) {
  if (index > startAtIndex) {
    return index - startAtIndex;
  }
  return -(startAtIndex - index);
}
function weeksOffset(index) {
  if (index === startAtIndex) {
    return 0;
  }
  let off = 0;
  if (index > startAtIndex) {
    for (let i = 0; i < index - startAtIndex; i++) {
      const cIndex = startAtIndex + i;
      off += gridCounts[cIndex] || getGridCount(cIndex);
    }
  } else {
    for (let i = 0; i < startAtIndex - index; i++) {
      const cIndex = startAtIndex - i - 1;
      off -= gridCounts[cIndex] || getGridCount(cIndex);
    }
  }
  return off;
}
export function getIndexFromHorizontalOffset(offset, width) {
  return startAtIndex + Math.floor(offset / width);
}
export function getIndexFromVerticalOffset(offset) {
  let estimatedIndex = startAtIndex + Math.ceil(offset / estimatedMonthHeight);
  const realOffset = getVerticalMonthsOffset(estimatedIndex);
  const difference = (realOffset - beginOffset - offset) / estimatedMonthHeight;
  if (difference >= 1 || difference <= -1) {
    estimatedIndex -= Math.floor(difference);
  }
  return estimatedIndex;
}
export function getHorizontalMonthOffset(index, width) {
  if (index < 0) {
    return 0;
  }
  return width * index;
}
export function getVerticalMonthsOffset(index) {
  const count = getIndexCount(index);
  const ob = weeksOffset(index);
  const monthsHeight = weekSize * ob;
  const c = monthsHeight + count * (dayNamesHeight + montHeaderHeight);
  return (c || 0) + beginOffset;
}
export function getMonthHeight(scrollMode, index) {
  const calendarHeight = getCalendarHeaderHeight(scrollMode);
  const gc = getGridCount(index);
  const currentMonthHeight = weekSize * gc;
  const extraHeight = scrollMode === 'horizontal' ? monthHeaderSingleHeight : montHeaderHeight;
  const c = calendarHeight + currentMonthHeight + extraHeight;
  return c || 0;
}
export default /*#__PURE__*/React.memo(Month);
//# sourceMappingURL=Month.js.map