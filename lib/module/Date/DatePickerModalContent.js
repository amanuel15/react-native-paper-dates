import * as React from 'react';
import Calendar from './Calendar';
import AnimatedCrossView from './AnimatedCrossView';
import DatePickerModalHeader from './DatePickerModalHeader';
import DatePickerModalContentHeader from './DatePickerModalContentHeader';
import CalendarEdit from './CalendarEdit';
import DatePickerModalHeaderBackground from './DatePickerModalHeaderBackground';
import { passedTheme } from '../utils';
export function DatePickerModalContent(props) {
  const {
    mode,
    onChange,
    onConfirm,
    onDismiss,
    disableSafeTop,
    disableWeekDays,
    locale,
    validRange,
    dateMode,
    startYear,
    endYear
  } = props;
  const anyProps = props;

  // use local state to add only onConfirm state changes
  const [state, setState] = React.useState({
    date: anyProps.date,
    startDate: anyProps.startDate,
    endDate: anyProps.endDate,
    dates: anyProps.dates
  });

  // update local state if changed from outside or if modal is opened
  React.useEffect(() => {
    setState({
      date: anyProps.date,
      startDate: anyProps.startDate,
      endDate: anyProps.endDate,
      dates: anyProps.dates
    });
  }, [anyProps.date, anyProps.startDate, anyProps.endDate, anyProps.dates]);
  const [collapsed, setCollapsed] = React.useState(true);
  const onInnerChange = React.useCallback(params => {
    onChange && onChange(params);
    setState(prev => ({
      ...prev,
      ...params
    }));
  }, [onChange, setState]);
  const onInnerConfirm = React.useCallback(() => {
    if (mode === 'single') {
      ;
      onConfirm({
        date: state.date
      });
    } else if (mode === 'range') {
      ;
      onConfirm({
        startDate: state.startDate,
        endDate: state.endDate
      });
    } else if (mode === 'multiple') {
      ;
      onConfirm({
        dates: state.dates || []
      });
    }
  }, [state, mode, onConfirm]);
  const onToggleCollapse = React.useCallback(() => {
    setCollapsed(prev => !prev);
  }, [setCollapsed]);
  const defaultUppercase = !passedTheme.isV3;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DatePickerModalHeaderBackground, null, /*#__PURE__*/React.createElement(DatePickerModalHeader, {
    locale: locale,
    onSave: onInnerConfirm,
    onDismiss: onDismiss,
    saveLabel: props.saveLabel,
    saveLabelDisabled: props.saveLabelDisabled ?? false,
    uppercase: props.uppercase ?? defaultUppercase,
    disableSafeTop: disableSafeTop,
    closeIcon: props.closeIcon
  }), /*#__PURE__*/React.createElement(DatePickerModalContentHeader, {
    state: state,
    mode: mode,
    collapsed: collapsed,
    onToggle: onToggleCollapse,
    headerSeparator: props.headerSeparator,
    emptyLabel: props.emptyLabel,
    label: props.label,
    moreLabel: props.moreLabel,
    startLabel: props.startLabel,
    endLabel: props.endLabel,
    uppercase: props.uppercase ?? defaultUppercase,
    locale: locale,
    editIcon: props === null || props === void 0 ? void 0 : props.editIcon,
    calendarIcon: props.calendarIcon,
    allowEditing: props.allowEditing ?? true
  })), /*#__PURE__*/React.createElement(AnimatedCrossView, {
    collapsed: collapsed,
    calendar: /*#__PURE__*/React.createElement(Calendar, {
      locale: locale,
      mode: mode,
      startDate: state.startDate,
      endDate: state.endDate,
      date: state.date,
      onChange: onInnerChange,
      disableWeekDays: disableWeekDays,
      dates: state.dates,
      validRange: validRange,
      dateMode: dateMode,
      startYear: startYear,
      endYear: endYear
    }),
    calendarEdit: /*#__PURE__*/React.createElement(CalendarEdit, {
      mode: mode,
      state: state,
      label: props.label,
      startLabel: props.startLabel,
      endLabel: props.endLabel,
      collapsed: collapsed,
      onChange: onInnerChange,
      validRange: validRange,
      locale: locale,
      inputEnabled: props.inputEnabled
    })
  }));
}
export default /*#__PURE__*/React.memo(DatePickerModalContent);
//# sourceMappingURL=DatePickerModalContent.js.map