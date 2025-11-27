import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Urls } from "../../navigation/navigation";
import Layout from "../../styles/layout";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { rem, setFont } from "../../styles/global-style";
import { useCallback, useEffect, useState } from "react";
import { getDepartments } from "../../api/api";
import { Department } from "../../types/departments";
import { palette } from "../../styles/color-palette";

const HomeScreen = (props: NativeStackScreenProps<RootStackParamList, Urls.Home>) => {
    const [departments, setDepartments] = useState<Department[]>()

    useEffect(() => {
        initializeData();
    }, []);

    const initializeData = async () => {
        const response = await getDepartments();
        if (response.isSuccess) {
            setDepartments(response.data.departments);
        }
    }

    const renderDepartment = useCallback((renderItem: ListRenderItemInfo<Department>) => {

        return <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>{renderItem.item.displayName}</Text>
        </TouchableOpacity>


    }, [])
    return <Layout disableInsetsTop>
        <View style={styles.container}>
            <FlatList
                data={departments}
                scrollEnabled={false}
                contentContainerStyle={styles.listContainer}
                renderItem={renderDepartment}
            />
        </View>
    </Layout>
}

const styles = StyleSheet.create({
    container: {
        gap: rem(12),
        padding: rem(12)
    },
    card: {
        backgroundColor: palette.softYellow,
        padding: rem(16),
        borderRadius: rem(12),

    },
    cardText: {
        ...setFont({
            color: palette.darkRed,
            fontSize: rem(16)
        })

    },
    listContainer: {
        gap: rem(12)
    }
})
export default HomeScreen;

