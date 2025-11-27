import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Urls } from "../../navigation/navigation";
import Layout from "../../styles/layout";
import { StyleSheet, Text, View } from "react-native";
import { rem, setFont } from "../../styles/global-style";
import MainButton from "../../components/button";

const HomeScreen = (props: NativeStackScreenProps<RootStackParamList, Urls.Home>) => {

    return <Layout>
        <View style={styles.container}>

            <Text style={styles.text}>Hello World</Text>
            <MainButton title="Press Me" />
            <MainButton title="Press Me" disabled />
            <MainButton title="Press Me" type="outlined" />
        </View>
    </Layout>
}

const styles = StyleSheet.create({
    container: {
        gap: rem(12),
        padding: rem(12)
    },
    text: {
        ...setFont({

        })
    }
})
export default HomeScreen;

