import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { MetObject } from "../../types/objects";
import { bookmarkIcon, heartIcon } from "../../../assets/icons";
import { SvgXml } from "react-native-svg";
import { useGlobalState } from "../../contexts/global-state";
import { useCallback, useMemo } from "react";
import { palette } from "../../styles/color-palette";
import { rem, setFont } from "../../styles/global-style";
import { NavigationProp, StackActions, useNavigation } from "@react-navigation/native";
import { RootStackParamList, Urls } from "../../navigation/navigation";

type ObjectCardOptions = {
    disableCountry?: boolean,
    disableFavoriteButton?: boolean,
    disableObjectName?: boolean,
    squareImage?: boolean,
    numberOfTitleLinesLimit?: number,
    numberOfArtistNameLinesLimit?: number,
    backgroundColor?: string,
    textColor?: string
}

const ObjectCard = (props: {
    item: MetObject,
    options?: ObjectCardOptions
}) => {
    const removeFavoriteObject = useGlobalState(state => state.removeFavoriteObject);
    const addFavoriteObject = useGlobalState(state => state.addFavoriteObject);
    const favoriteObjectIds = useGlobalState(state => state.favoriteObjectIds)
    const isFavorite = useMemo(() => favoriteObjectIds.some(id => id == props.item.objectID), [favoriteObjectIds]);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const onPress = () => {
        navigation.dispatch(StackActions.push(Urls.ObjectDetail, { object: props.item }));
    }
    const imageStyle = [styles.image, props.options?.squareImage && { aspectRatio: 1 }];
    const backgroundColor = props.options?.backgroundColor ?? palette.softYellow;
    const color = props.options?.textColor ?? palette.darkRed;

    const showCountry = (props.item.city || props.item.county || props.item.country) && !props.options?.disableCountry;
    const showObjectName = (props.item.objectName) && !props.options?.disableObjectName;
    const showObjectDate = (props.item.objectDate || props.item.objectBeginDate || props.item.objectEndDate);
    const showItemContent = showCountry || showObjectName || showObjectDate;
    return (
        <TouchableOpacity style={[styles.card, { backgroundColor }]}
            onPress={onPress}
        >
            {!props.options?.disableFavoriteButton && <TouchableOpacity
                hitSlop={32}
                style={styles.heartIconContainer} onPress={() => {
                    (isFavorite ? removeFavoriteObject : addFavoriteObject)(props.item.objectID);
                }}>
                <SvgXml xml={heartIcon(isFavorite, color)} style={styles.heartIcon} />
            </TouchableOpacity>}
            {props.item.primaryImageSmall ? <Image
                source={{ uri: props.item.primaryImageSmall }}
                style={imageStyle}
            /> : <View
                style={imageStyle}

            />}
            <View style={styles.labelsContainer}>
                <View style={styles.titleContent}>
                    <Text numberOfLines={props.options?.numberOfArtistNameLinesLimit} style={[styles.artistName, { color }]}>{props.item.artistDisplayName}</Text>
                    <Text numberOfLines={props.options?.numberOfTitleLinesLimit} style={[styles.title, { color }]}>{props.item.title}</Text>
                </View>
                {showItemContent && <View style={styles.itemContent}>
                    {showCountry && <Text style={[styles.cardText, {color}]}>{[props.item.city, props.item.county, props.item.country].filter(i => !!i).join(', ')}</Text>}
                    {showObjectName && <Text style={[styles.cardText, {color}]}>{props.item.objectName}</Text>}
                    {showObjectDate && <Text
                        style={[styles.cardText, {color,  fontStyle: 'italic' }]}>
                        {props.item.objectDate ?? [props.item.objectBeginDate, props.item.objectEndDate]
                            .filter(i => !!i)
                            .join(' - ')}
                    </Text>}
                </View>}
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
        padding: rem(8),
        borderRadius: rem(12),
        flex: 1,
        gap: rem(10),
    },
    title: {
        ...setFont({
            fontSize: rem(22),
            fontWeight: '600',
            flex: 1
        })

    },
    cardText: {
        ...setFont({
            fontSize: rem(16),
            flex: 1,
        })
    },
    artistName: {
        ...setFont({
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
