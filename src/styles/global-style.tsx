import { Dimensions, StyleProp, TextStyle, useWindowDimensions } from "react-native";
import { palette } from "./color-palette";

export const { height, width } = Dimensions.get('window');

const designHeight = 874;
const designWidth = 402;

export const rem = (value: number) => {
    return (value / designWidth) * width;
}

export const setFont = (value: TextStyle & { isItalic?: boolean }): TextStyle => {
    if (!value.fontFamily) {
        let fontName = 'Baskervville-';
        let shouldAddItalic = !!value.isItalic;
        switch (value.fontWeight) {
            case "400":
                if (shouldAddItalic) {
                    fontName += 'Italic';
                    shouldAddItalic = false;
                }
                else {
                    fontName += 'Regular';
                }
                break;
            case "500":
                fontName += 'Medium';
                break;
            case "600":
                fontName += 'SemiBold'
                break;
            case "700":
                fontName += 'Bold'
                break;
            default:
                fontName += 'Regular'
                break;
        }
        if (shouldAddItalic) {
            fontName += 'Italic';
        }
        value.fontFamily = fontName;
    }
    if (!value.fontSize) {
        value.fontSize = rem(14);
    }
    if (!value.lineHeight) {
        value.lineHeight = value.fontSize * 1.4;
    }
    if (!value.color) {
        value.color = palette.black;
    }
    return value;
} 