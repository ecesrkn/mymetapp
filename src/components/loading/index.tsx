import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useGlobalState } from "../../contexts/global-state";
import { palette } from "../../styles/color-palette";
import { hexToRGB } from "../../styles/global-style";

const Loading = () => {
    const isLoading = useGlobalState(state => state.loadingCount) > 0;

    if (isLoading) {
        return (
            <View style={styles.wrapper}>
                <ActivityIndicator color={palette.softYellow} size={"large"}/>
            </View>
        )
    }
    else return undefined;
}

export default Loading;

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: hexToRGB(palette.darkGrey, '0.5'),
        alignItems: 'center',
        justifyContent: 'center'
    }
});