import * as React from 'react';
declare const _default: React.ForwardRefExoticComponent<Omit<import("react-native").TextInputProps & React.RefAttributes<import("react-native").TextInput> & {
    mode?: "flat" | "outlined" | undefined;
    left?: React.ReactNode;
    right?: React.ReactNode;
    disabled?: boolean | undefined;
    label?: import("react-native-paper/lib/typescript/components/TextInput/types").TextInputLabelProp | undefined;
    placeholder?: string | undefined;
    error?: boolean | undefined;
    onChangeText?: Function | undefined;
    selectionColor?: string | undefined;
    cursorColor?: string | undefined;
    underlineColor?: string | undefined;
    activeUnderlineColor?: string | undefined;
    outlineColor?: string | undefined;
    activeOutlineColor?: string | undefined;
    textColor?: string | undefined;
    dense?: boolean | undefined;
    multiline?: boolean | undefined;
    numberOfLines?: number | undefined;
    onFocus?: ((args: any) => void) | undefined;
    onBlur?: ((args: any) => void) | undefined;
    render?: ((props: import("react-native-paper/lib/typescript/components/TextInput/types").RenderProps) => React.ReactNode) | undefined;
    value?: string | undefined;
    style?: import("react-native").StyleProp<import("react-native").TextStyle>;
    theme?: import("react-native-paper/lib/typescript/types").ThemeProp | undefined;
    testID?: string | undefined;
    contentStyle?: import("react-native").StyleProp<import("react-native").TextStyle>;
    outlineStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    underlineStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
} & React.RefAttributes<{
    focus: () => void;
    clear: () => void;
    blur: () => void;
    isFocused: () => boolean;
    setNativeProps: (nativeProps: object) => void;
}> & {
    mask: string;
    value: string;
    inputButton: React.ReactNode;
}, "ref"> & React.RefAttributes<unknown>>;
export default _default;
//# sourceMappingURL=TextInputMask.d.ts.map