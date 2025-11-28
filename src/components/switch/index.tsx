import { StyleSheet, View, Text, Switch as RNSwitch } from "react-native";
import { rem, setFont } from "../../styles/global-style";
import { palette } from "../../styles/color-palette";

const Switch = (props: {
    value: boolean,
    onValueChange: (value: boolean) => void,
    label: string
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Show only my favorite departments.</Text>
            <RNSwitch
                value={props.value}
                onValueChange={props.onValueChange}
                trackColor={{ false: palette.grey, true: palette.darkRed }}
            />
        </View>
    );
}

export default Switch;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: rem(18),
    },
    label: {
        ...setFont({
            color: palette.cream,
            fontSize: rem(18),
            flex: 1
        })
    },
});