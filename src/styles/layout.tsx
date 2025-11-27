import { ScrollView, StyleSheet, View } from "react-native"
import { palette } from "./color-palette";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = (props: {
    children: React.ReactNode,
    disableScroll?: boolean,
    disableInsetsTop?: boolean
}) => {
    const insets = useSafeAreaInsets();
    return <View style={[styles.wrapper, {
        paddingTop: props.disableInsetsTop ? 0 : insets.top,
        paddingBottom: insets.bottom + 25,
    }]}>
        <ScrollView
            scrollEnabled={!props.disableScroll}
            style={styles.scroll}>
            {props.children}
        </ScrollView>
    </View>
}

export default Layout;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: palette.rose
    },
    scroll: {
        flex: 1

    }
})