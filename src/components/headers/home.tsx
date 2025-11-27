import { StyleSheet, View, Text } from "react-native";
import { rem, setFont } from "../../styles/global-style";
import { palette } from "../../styles/color-palette";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeHeader = (props: {

}) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {
            paddingTop: insets.top + rem(12),
        }]}>
            <Text style={styles.title}>The Met</Text>
            <Text style={styles.subtitle}>Public Domain Art Gallery</Text>
        </View>
    );
}

export default HomeHeader;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: rem(0),
        backgroundColor: palette.green,
        padding: rem(12)
    },
    title: {
        ...setFont({
            fontSize: rem(24),
            fontWeight: '700',
            color: palette.rose
        }),
    },
    subtitle: {
        ...setFont({
            fontSize: rem(18),
            fontWeight: '400',
            fontStyle: 'italic',
            color: palette.darkRed
        }),
    },

});