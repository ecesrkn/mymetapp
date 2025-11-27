import { ScrollView, StyleSheet, View } from "react-native"
import { palette } from "./color-palette";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = (props: {
    children: React.ReactNode,
    disableScroll?: boolean
}) => {
    const insets = useSafeAreaInsets()

  console.log(`asd`)

  console.log(`56`)

    return <ScrollView
        style={[styles.wrapper, {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        }]}
        contentContainerStyle={styles.content}>
        {props.children}
    </ScrollView>
}

export default Layout;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: palette.rose
    },
    content: {

    }
})