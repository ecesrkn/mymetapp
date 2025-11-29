import { StyleSheet, View, Text, ColorValue, StyleProp, TextStyle, TouchableOpacity } from "react-native";
import { rem, setFont } from "../../styles/global-style";
import { palette } from "../../styles/color-palette";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { chevronBack } from "../../../assets/icons";

const DefaultHeader = (props: {
    title: string
    endComponent?: React.ReactNode
    backgroundColor: ColorValue,
    textStyle?: TextStyle
}) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    console.log(props.textStyle)

    return (
        <View style={{
            paddingTop: insets.top,
            backgroundColor: props.backgroundColor,
        }}>
            <View style={[styles.container, !!props.endComponent && { paddingHorizontal: rem(62) }]}>
                {navigation.canGoBack() && <TouchableOpacity style={styles.backButton}>
                    <SvgXml xml={chevronBack((props.textStyle?.color ?? palette.darkRed).toString())} style={styles.backButtonIcon} />

                </TouchableOpacity>}
                <Text style={[styles.title, props.textStyle]}>{props.title}</Text>
                {props.endComponent}
            </View>

        </View>
    );
}

export default DefaultHeader;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: rem(12),
        paddingVertical: rem(12),
        paddingHorizontal: rem(40),
        flexDirection: 'row'
    },
    backButton: {
        position: 'absolute',
        left: rem(16)
    },
    backButtonIcon: {
        height: rem(24),
        width: rem(24)
    },
    title: {
        ...setFont({
            fontSize: rem(24),
            fontWeight: '600',
            color: palette.darkRed,
            textAlign: 'center'
        }),
        flex: 1
    },

});