import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { rem, setFont } from "../../styles/global-style";
import { palette } from "../../styles/color-palette";

const MainButton = (props: {
    onPress?: () => void,
    title: string,
    disabled?: boolean,
    type?: 'default' | 'outlined'
}) => {

    return (<TouchableOpacity
        disabled={props.disabled}
        onPress={props.onPress}
        style={[styles.button,
        props.type == 'outlined' && !props.disabled && styles.outlined,
        props.disabled && styles.disabled
        ]}
    >
        <Text style={[styles.text,
        props.type == 'outlined' && !props.disabled && styles.textOutlined,
        props.disabled && styles.textDisabled
        ]}>{props.title}</Text>
    </TouchableOpacity>);
}

export default MainButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: palette.darkRed,
        borderRadius: rem(12),
        paddingHorizontal: rem(16),
        paddingVertical: rem(12),
        flexDirection: 'row',
        borderWidth: 0,
    },
    outlined: {
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: palette.cream
    },
    disabled: {
        borderWidth: 0,
        backgroundColor: palette.grey,

    },
    text: {
        ...setFont({
            color: palette.cream,
            fontSize: rem(18),
            textAlign: 'center',
            fontWeight: '600'
        }),
        flex: 1
    },
    textDisabled: {
        color: palette.darkGrey,
    },
    textOutlined: {
        color: palette.cream,
    }

});