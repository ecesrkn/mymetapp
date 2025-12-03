import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Urls } from "../../navigation/navigation";
import Layout from "../../styles/layout";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { rem, setFont } from "../../styles/global-style";
import { useEffect, useRef, useState } from "react";
import { getMetObjects, getMetObjectsWithTheIds } from "../../api/api";
import { palette } from "../../styles/color-palette";
import { SvgXml } from "react-native-svg";
import { bookmarkIcon } from "../../../assets/icons";
import { GetObjectsResponseData, MetObject } from "../../types/objects";
import DefaultHeader from "../../components/headers/default";
import { useGlobalState } from "../../contexts/global-state";
import ObjectCard from "../../components/objectCard";

type PagerData = GetObjectsResponseData & {
    TotalPages: number,
    CurrentPage: number,
}
const PAGE_SIZE = 10;
const DepartmentScreen = (props: NativeStackScreenProps<RootStackParamList, Urls.DepartmentDetail>) => {
    const [pagerData, setPagerData] = useState<PagerData>();
    const [objects, setObjects] = useState<MetObject[]>([])
    const isDepartmentFavorite = useGlobalState(state => state.favoriteDepartmentIds).some(id => id == props.route.params.departmentId)
    const removeFavoriteDepartment = useGlobalState(state => state.removeFavoriteDepartment);
    const addFavoriteDepartment = useGlobalState(state => state.addFavoriteDepartment);


    const isLoading = useRef(false);

    useEffect(() => {
        initializeData();
    }, []);

    useEffect(() => {
        if (pagerData) {
            loadBatch();
        }
    }, [pagerData?.CurrentPage]);


    useEffect(() => {
        props.navigation.setOptions({
            header: () => <DefaultHeader
                title={props.route.params.displayName}
                backgroundColor={palette.softYellow}
                endComponent={<TouchableOpacity
                    style={styles.bookmarkIconContainer}
                    onPress={() => (isDepartmentFavorite ? removeFavoriteDepartment : addFavoriteDepartment)(props.route.params.departmentId)}
                >
                    <SvgXml xml={bookmarkIcon(isDepartmentFavorite, palette.darkRed)} style={styles.bookmarkIcon} />
                </TouchableOpacity>}
            />
        })
    }, [isDepartmentFavorite]);


    const initializeData = async () => {
        const response = await getMetObjects({
            departmentIds: [props.route.params.departmentId]
        });
        if (response.isSuccess) {
            setPagerData({
                ...response.data,
                CurrentPage: 0,
                TotalPages: Math.ceil(response.data.total / PAGE_SIZE)
            });
        }
    }

    const loadBatch = async () => {
        console.log('Load batch for page ', pagerData?.CurrentPage);
        isLoading.current = true;
        try {

            if (pagerData && (pagerData.CurrentPage < pagerData.TotalPages)) {
                const response = await getMetObjectsWithTheIds({
                    objectIds: pagerData.objectIDs
                        .slice(pagerData.CurrentPage * PAGE_SIZE, (pagerData.CurrentPage + 1) * PAGE_SIZE)
                }
                );

                setObjects(prev => [...prev, ...((response).filter(item => !!item))]);
            }


        } catch (error) {
            console.log('error', error)

        }
        setTimeout(() => {
            isLoading.current = false;
        }, 100);
    }

    const renderObject = (renderItem: ListRenderItemInfo<MetObject>) => {
        if (renderItem.item) {
            return <ObjectCard item={renderItem.item} />
        }
        else return <></>

    }

    return <Layout disableInsetsTop backgroundColor={palette.cream} disableScroll>
        <View style={styles.container}>
            {(objects.length > 0) && <FlatList
                data={objects}
                renderItem={renderObject}
                numColumns={2}
                scrollEnabled={true}
                style={{ flex: 1 }}
                columnWrapperStyle={{ gap: rem(10) }}
                contentContainerStyle={styles.listContainer}
                onEndReachedThreshold={0.05}
                showsVerticalScrollIndicator={false}
                onEndReached={() => {
                    if ( isLoading.current) return;
                    setPagerData(data => {
                        if (data) {
                            return {
                                ...data,
                                CurrentPage: data.CurrentPage + 1,
                            }
                        }
                        else return data;
                    });
                }}
            />}
        </View>
    </Layout>
}

const styles = StyleSheet.create({
    container: {
        padding: rem(16),
        flex: 1

    },
    listContainer: {
        gap: rem(10)
    },
    bookmarkIconContainer: {
        position: 'absolute',
        right: rem(24),
    },
    bookmarkIcon: {
        width: rem(14),
        height: rem(18),
    },

})
export default DepartmentScreen;

