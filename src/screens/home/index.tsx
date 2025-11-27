import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Urls } from "../../navigation/navigation";
import Layout from "../../styles/layout";
import { FlatList, ListRenderItemInfo, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { rem, setFont } from "../../styles/global-style";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getDepartments } from "../../api/api";
import { Department } from "../../types/departments";
import { palette } from "../../styles/color-palette";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgXml } from "react-native-svg";
import { bookmarkIcon } from "../../../assets/icons";

const HomeScreen = (props: NativeStackScreenProps<RootStackParamList, Urls.Home>) => {
    const [departments, setDepartments] = useState<(Department & { isFavorite?: boolean })[]>()
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const itemsDisplayed = useMemo(() => {
        if (departments) {
            return departments.filter(d => showFavoritesOnly ? d.isFavorite : true);
        }
        else return [];
    }, [departments, showFavoritesOnly])

    useEffect(() => {
        initializeData();
    }, []);

    useEffect(() => {
        if (departments) {
            initializeFavorites();
        }
    }, [departments]);

    const initializeData = async () => {
        const response = await getDepartments();
        if (response.isSuccess) {
            setDepartments(response.data.departments);
        }
    }

    const getCurrentDepartmentFavorites = async () => {
        let idList: number[];
        const storedStr = await AsyncStorage.getItem('DepartmentFavorites');
        if (storedStr) {
            try {
                idList = JSON.parse(storedStr)
            } catch (error) {
                idList = [];
            }
        }
        else {
            idList = [];
        }
        return idList;
    }
    const setDepartmentFavorites = async (idList: number[]) => {
        await AsyncStorage.setItem('DepartmentFavorites', JSON.stringify(idList));
    }


    const initializeFavorites = async () => {
        const idList = await getCurrentDepartmentFavorites();

        setDepartments(depList => {
            return depList?.map((item, index) => {
                return {
                    ...item,
                    isFavorite: idList.some(id => id == item.departmentId)
                }
            })
        })
    }

    const addItemToFavoritesList = async (id: number) => {
        const idList = await getCurrentDepartmentFavorites();
        idList.push(id);
        await setDepartmentFavorites(idList);
    }
    const removeItemFromFavoritesList = async (id: number) => {
        const idList = await getCurrentDepartmentFavorites();
        const newList = (idList).filter(item => item != id);
        await setDepartmentFavorites(newList);
    }


    const renderDepartment = useCallback((renderItem: ListRenderItemInfo<Department & { isFavorite?: boolean }>) => {
        return <TouchableOpacity style={styles.card}>
            <TouchableOpacity 
            hitSlop={32}
            style={styles.bookmarkIconContainer} onPress={() => {
                if (renderItem.item.isFavorite) {
                    removeItemFromFavoritesList(renderItem.item.departmentId)
                }
                else {
                    addItemToFavoritesList(renderItem.item.departmentId)
                }
            }}>
                <SvgXml xml={bookmarkIcon(renderItem.item.isFavorite ?? false, palette.darkRed)} style={styles.bookmarkIcon} />
            </TouchableOpacity>
            <Text style={styles.cardText}>{renderItem.item.displayName}</Text>
        </TouchableOpacity>
    }, []);

    return <Layout disableInsetsTop>
        <View style={styles.container}>
            <View style={styles.filters}>
                <Text style={styles.filterLabel}>Show only my favorite departments.</Text>
                <Switch
                    value={showFavoritesOnly}
                    onValueChange={setShowFavoritesOnly}
                    trackColor={{ false: palette.grey, true: palette.darkRed }}
                />
            </View>
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
    filters: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: rem(18),
    },
    filterLabel: {
        ...setFont({
            color: palette.cream,
            fontSize: rem(18),
            flex: 1
        })
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

