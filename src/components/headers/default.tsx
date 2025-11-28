import { StyleSheet, View, Text } from "react-native";
import { rem, setFont } from "../../styles/global-style";
import { palette } from "../../styles/color-palette";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DefaultHeader = (props: {
    title: string
    endComponent?: React.ReactNode
}) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{
            paddingTop: insets.top,
            backgroundColor: palette.softYellow,
        }}>
            <View style={[styles.container, !!props.endComponent && { paddingHorizontal: rem(62)}]}>
                <Text style={styles.title}>{props.title}</Text>
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