import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Urls } from "../../navigation/navigation";
import Layout from "../../styles/layout";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { rem, setFont } from "../../styles/global-style";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getDepartments } from "../../api/api";
import { Department } from "../../types/departments";
import { palette } from "../../styles/color-palette";
import { SvgXml } from "react-native-svg";
import { bookmarkIcon } from "../../../assets/icons";
import Switch from "../../components/switch";
import { useGlobalState } from "../../contexts/global-state";

const HomeScreen = (props: NativeStackScreenProps<RootStackParamList, Urls.Home>) => {
    const departments = useGlobalState(state => state.departments);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const favoriteDepartmentIds = useGlobalState(state => state.favoriteDepartmentIds);
    const addFavoriteDepartment = useGlobalState(state => state.addFavoriteDepartment);
    const removeFavoriteDepartment = useGlobalState(state => state.removeFavoriteDepartment);

    const getIsFavoriteDept = useCallback((favId: number) => favoriteDepartmentIds.some(id => id == favId), [favoriteDepartmentIds])

    const itemsDisplayed = useMemo(() => {
        if (departments) {
            return departments.filter(d => showFavoritesOnly ? getIsFavoriteDept(d.departmentId) : true);
        }
        else return [];
    }, [departments, showFavoritesOnly, favoriteDepartmentIds])

    useEffect(() => {
        initializeData();
    }, []);

    const initializeData = async () => {
        getDepartments();
    }

    const renderDepartment = useCallback((renderItem: ListRenderItemInfo<Department>) => {
        const isFavorite = getIsFavoriteDept(renderItem.item.departmentId)
        return <TouchableOpacity style={styles.card}
            onPress={() => props.navigation.navigate(Urls.DepartmentDetail, renderItem.item)}
        >
            <TouchableOpacity
                hitSlop={32}
                style={styles.bookmarkIconContainer} onPress={() => {
                    (isFavorite ? removeFavoriteDepartment : addFavoriteDepartment)(renderItem.item.departmentId);
                }}>
                <SvgXml xml={bookmarkIcon(isFavorite, palette.darkRed)} style={styles.bookmarkIcon} />
            </TouchableOpacity>
            <Text style={styles.cardText}>{renderItem.item.displayName}</Text>
        </TouchableOpacity>
    }, [favoriteDepartmentIds]);

    return <Layout disableInsetsTop>
        <View style={styles.container}>
            <Switch
                value={showFavoritesOnly}
                onValueChange={setShowFavoritesOnly}
                label='Show only my favorite departments.'
            />
            <FlatList
                data={itemsDisplayed}
                scrollEnabled={false}
                contentContainerStyle={styles.listContainer}
                renderItem={renderDepartment}
            />
            {showFavoritesOnly
                ? <Text style={styles.footnote}>Total number of favorite departments: {itemsDisplayed?.length}</Text>
                : <Text style={styles.footnote}>Total number of departments: {itemsDisplayed?.length}</Text>
            }

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
    },
    footnote: {
        ...setFont({
            fontSize: rem(14),
            color: palette.cream,
            textAlign: 'center'
        })
    },
    bookmarkIconContainer: {
        position: 'absolute',
        right: rem(12),
        top: -1
    },
    bookmarkIcon: {
        width: rem(14),
        height: rem(18),
    }
})
export default HomeScreen;

