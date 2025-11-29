import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Urls } from "../../navigation/navigation";
import Layout from "../../styles/layout";
import { FlatList, Image, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { rem, setFont } from "../../styles/global-style";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getMetObject, getMetObjects } from "../../api/api";
import { palette } from "../../styles/color-palette";
import { SvgXml } from "react-native-svg";
import { bookmarkIcon, heartIcon } from "../../../assets/icons";
import { GetObjectsResponseData, MetObject } from "../../types/objects";
import DefaultHeader from "../../components/headers/default";
import { useGlobalState } from "../../contexts/global-state";
import HorizontalObjectScroll from "../../components/horizontalObjectScroll";

const ObjectScreen = (props: NativeStackScreenProps<RootStackParamList, Urls.ObjectDetail>) => {
    const object = props.route.params.object;
    const removeFavoriteObject = useGlobalState(state => state.removeFavoriteObject);
    const addFavoriteObject = useGlobalState(state => state.addFavoriteObject);
    const favoriteObjectIds = useGlobalState(state => state.favoriteObjectIds)
    const isFavorite = useMemo(() => favoriteObjectIds.some(id => id == object.objectID), [favoriteObjectIds])


    useEffect(() => {
        props.navigation.setOptions({
            header: () => <DefaultHeader
                title={object.title}
                backgroundColor={palette.rose}
                textStyle={{ color: palette.softYellow }}
                endComponent={<TouchableOpacity
                    style={styles.favoriteIconContainer}
                    onPress={() => (isFavorite ? removeFavoriteObject : addFavoriteObject)(object.objectID)}
                >
                    <SvgXml xml={heartIcon(isFavorite, palette.softYellow)} style={styles.favoriteIcon} />
                </TouchableOpacity>}
            />
        })
    }, [isFavorite]);



    return <Layout disableInsetsTop backgroundColor={palette.darkRed}>
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: object.primaryImage }} />

            {object.artistDisplayName && <HorizontalObjectScroll
                searchParams={{
                    artistOrCulture: true,
                    q: object.artistAlphaSort,
                    // q: 'Bourdon',
                    // hasImages: true,
                }}
                numberOfObjects={7}
                title="Related Artwork"
                excludeObjectId={object.objectID}
            />}

        </View>
    </Layout>
}

const styles = StyleSheet.create({
    container: {
        padding: rem(16),
        flex: 1

    },
    favoriteIconContainer: {
        position: 'absolute',
        right: rem(20),
    },
    favoriteIcon: {
        width: rem(24),
        height: rem(24),
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
    }

})
export default ObjectScreen;

