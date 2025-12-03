import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Urls } from "../../navigation/navigation";
import Layout from "../../styles/layout";
import { FlatList, Image, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { hexToRGB, rem, setFont } from "../../styles/global-style";
import { lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
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

    const handlePressTag = (term: string) => {
        console.log(term)
    }

    const objectLocation = (object.geographyType ? object.geographyType + ' ' : '') + [object.county, object.subregion, object.city, object.state, object.country].filter(i => !!i).join(', ')
 
    return <Layout disableInsetsTop backgroundColor={palette.darkRed}>
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: object.primaryImage }} />
            <View style={styles.table}>
                {object.objectID && <View style={styles.row}>
                    <Text style={styles.label}>Identification Number</Text>
                    <Text style={styles.value}>{object.objectID}</Text>
                </View>}
                {object.artistDisplayName && <View style={styles.row}>
                    <Text style={styles.label}>Artist</Text>
                    <Text style={styles.value}>{object.artistDisplayName} {`(${object.artistDisplayBio})`}</Text>
                </View>}
                {object.culture && <View style={styles.row}>
                    <Text style={styles.label}>Culture</Text>
                    <Text style={styles.value}>{object.culture}</Text>
                </View>}
                {object.objectDate && <View style={styles.row}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.value}>{object.objectDate}</Text>
                </View>}
                <View style={styles.row}>
                    <Text style={styles.label}>Medium</Text>
                    <Text style={styles.value}>{object.medium}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Dimensions</Text>
                    <Text style={styles.value}>{object.dimensions}</Text>
                </View>
                {objectLocation && <View style={styles.row}>
                    <Text style={styles.label}>Geography</Text>
                    <Text style={styles.value}>{objectLocation}</Text>
                </View>}
                <View style={styles.row}>
                    <Text style={styles.label}>Classification</Text>
                    <Text style={styles.value}>{object.classification}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Curatorial Department</Text>
                    <Text style={styles.value}>{object.department}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Credit Line</Text>
                    <Text style={styles.value}>{object.creditLine}</Text>
                </View>
                {object.accessionNumber && <View style={styles.row}>
                    <Text style={styles.label}>Object Number</Text>
                    <Text style={styles.value}>{object.accessionNumber}</Text>
                </View>}
                {object.GalleryNumber && <View style={styles.row}>
                    <Text style={styles.label}>Gallery Number</Text>
                    <Text style={styles.value}>{object.GalleryNumber}</Text>
                </View>}
                {object.tags?.length > 0 && <View style={styles.row}>
                    <Text style={styles.label}>Tags</Text>
                    <View style={styles.tagsContainer}>
                        {object.tags.map((t, index) => <Text style={[styles.value, { flex: undefined }]}>
                            <Text style={styles.tag} onPress={() => handlePressTag(t.term)}>#{t.term}</Text>
                            {index < (object.tags.length - 1) ? ',' : ''}
                            </Text>)}
                    </View>
                </View>}
            </View>
            {/* {object.artistDisplayName && <HorizontalObjectScroll
                searchParams={{
                    artistOrCulture: true,
                    q: object.artistAlphaSort,
                    // hasImages: true,
                }}
                numberOfObjects={7}
                title="Related Artwork"
                excludeObjectId={object.objectID}
            />} */}

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
    },
    table: {
        gap: 0,
        backgroundColor: palette.rose,
        borderRadius: rem(8)
    },
    row: {
        flexDirection: 'row',
        gap: rem(10),
        alignItems: 'center',
        paddingHorizontal: rem(12),
        paddingVertical: rem(8)
    },
    label: {
        ...setFont({
            fontSize: rem(18),
            fontWeight: '500',
            color: palette.cream,
            flex: 3
        })
    },
    value: {
        ...setFont({
            fontSize: rem(18),
            color: palette.cream,
            fontWeight: '500',
            flex: 5
        })
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: rem(6),
        flex: 5,
    },
    tag: {
        color: palette.green,
        textDecorationLine: 'underline',
    }

})
export default ObjectScreen;

