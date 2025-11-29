import { Dimensions, StyleProp, TextStyle, useWindowDimensions } from "react-native";
import { palette } from "./color-palette";

export const { height, width } = Dimensions.get('window');

const designHeight = 874;
const designWidth = 402;

export const rem = (value: number) => {
    return (value / designWidth) * width;
}

export const setFont = (value: TextStyle): TextStyle => {
    if (!value.fontFamily) {
        let fontName = 'Baskervville-';
        let shouldAddItalic = (value.fontStyle == 'italic');
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
        value.lineHeight = value.fontSize * 1.5;
    }
    if (!value.color) {
        value.color = palette.black;
    }
    return value;
}

export function hexToRGB(hex: string, alpha: string) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}