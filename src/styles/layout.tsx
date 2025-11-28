import { ColorValue, ScrollView, StyleSheet, View } from "react-native"
import { palette } from "./color-palette";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = (props: {
    children: React.ReactNode,
    disableScroll?: boolean,
    disableInsetsTop?: boolean,
    backgroundColor?: ColorValue
}) => {
    const insets = useSafeAreaInsets();
    const backgroundColor = props.backgroundColor ?? palette.rose
    return <View style={[styles.wrapper, {
        backgroundColor,
        paddingTop: props.disableInsetsTop ? 0 : insets.top,
        paddingBottom: insets.bottom + 25,
    }]}>
        {props.disableScroll
            ? <View style={styles.scroll}>{props.children}</View>
            : <ScrollView
                style={styles.scroll}>
                {props.children}
            </ScrollView>}
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