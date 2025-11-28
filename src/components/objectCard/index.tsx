import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { MetObject } from "../../types/objects";
import { bookmarkIcon, heartIcon } from "../../../assets/icons";
import { SvgXml } from "react-native-svg";
import { useGlobalState } from "../../contexts/global-state";
import { useCallback, useMemo } from "react";
import { palette } from "../../styles/color-palette";
import { rem, setFont } from "../../styles/global-style";

const ObjectCard = (props: {
    item: MetObject,
}) => {
    const removeFavoriteObject = useGlobalState(state => state.removeFavoriteObject);
    const addFavoriteObject = useGlobalState(state => state.addFavoriteObject);
    const favoriteObjectIds = useGlobalState(state => state.favoriteObjectIds)
    const isFavorite = useMemo(() => favoriteObjectIds.some(id => id == props.item.objectID), [favoriteObjectIds])
    return (
        <TouchableOpacity style={styles.card} >
            <TouchableOpacity
                hitSlop={32}
                style={styles.heartIconContainer} onPress={() => {
                    (isFavorite ? removeFavoriteObject : addFavoriteObject)(props.item.objectID);
                }}>
                <SvgXml xml={heartIcon(isFavorite, palette.darkRed)} style={styles.heartIcon} />
            </TouchableOpacity>
            {props.item.primaryImageSmall ? <Image
                source={{ uri: props.item.primaryImageSmall }}
                style={styles.image}
            /> : <View
                style={styles.image}

            />}
            <View style={styles.labelsContainer}>
                <View style={styles.titleContent}>
                    <Text style={styles.artistName}>{props.item.artistDisplayName}</Text>
                    <Text style={styles.title}>{props.item.title}</Text>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.cardText}>{[props.item.city, props.item.county, props.item.country].filter(i => !!i).join(', ')}</Text>
                    <Text style={styles.cardText}>{props.item.objectName}</Text>
                    <Text style={[styles.cardText, { fontStyle: 'italic' }]}>{props.item.objectDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ObjectCard;

const styles = StyleSheet.create({
    heartIconContainer: {
        position: 'absolute',
        right: rem(10),
        bottom: rem(10),
        zIndex: 10
    },
    heartIcon: {
        width: rem(24),
        height: rem(24),
    },
    card: {
        backgroundColor: palette.softYellow,
        padding: rem(8),
        borderRadius: rem(12),
        flex: 1,
        gap: rem(10),
    },
    title: {
        ...setFont({
            color: palette.darkRed,
            fontSize: rem(22),
            fontWeight: '600',
            flex: 1
        })

    },
    cardText: {
        ...setFont({
            color: palette.darkRed,
            fontSize: rem(16),
            flex: 1,
        })
    },
    artistName: {
        ...setFont({
            color: palette.darkRed,
            fontSize: rem(16),
            fontWeight: '500',
            flex: 1
        })
    },
    image: {
        width: '100%',
        aspectRatio: 3 / 4,
        resizeMode: 'contain',
        borderRadius: rem(4)
    },
    labelsContainer: {
        gap: rem(4),
        flex: 1,
        justifyContent: 'space-between',
    },
    titleContent: {
        gap: rem(4),
    },
    itemContent: {
        gap: rem(0),
        paddingRight: rem(32),
    }

});