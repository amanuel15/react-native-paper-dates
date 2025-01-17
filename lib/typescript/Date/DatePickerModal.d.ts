import * as React from 'react';
import { MD3Theme } from 'react-native-paper';
import { DatePickerModalContentMultiProps, DatePickerModalContentRangeProps, DatePickerModalContentSingleProps } from './DatePickerModalContent';
interface DatePickerModalProps {
    visible: boolean;
    animationType?: 'slide' | 'fade' | 'none';
    disableStatusBar?: boolean;
    disableStatusBarPadding?: boolean;
    inputEnabled?: boolean;
    presentationStyle?: 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen';
}
interface PassedProps {
    theme?: MD3Theme;
}
export interface DatePickerModalSingleProps extends DatePickerModalContentSingleProps, DatePickerModalProps, PassedProps {
}
export interface DatePickerModalMultiProps extends DatePickerModalContentMultiProps, DatePickerModalProps, PassedProps {
}
export interface DatePickerModalRangeProps extends DatePickerModalContentRangeProps, DatePickerModalProps, PassedProps {
}
export declare function DatePickerModal(props: DatePickerModalRangeProps | DatePickerModalSingleProps | DatePickerModalMultiProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DatePickerModal>;
export default _default;
//# sourceMappingURL=DatePickerModal.d.ts.map