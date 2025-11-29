import { StyleSheet, View, Text, FlatList, ListRenderItemInfo } from "react-native";
import { MetObject, MetSearchParams } from "../../types/objects";
import { useEffect, useState } from "react";
import { getMetObjectsWithTheIds, searchMetObjects } from "../../api/api";
import ObjectCard from "../objectCard";
import { rem, setFont } from "../../styles/global-style";
import { palette } from "../../styles/color-palette";

const HorizontalObjectScroll = (props: {
    title: string,
    searchParams: MetSearchParams,
    numberOfObjects: number,
    excludeObjectId?: number,
}) => {
    const [objects, setObjects] = useState<MetObject[]>();

    useEffect(() => {
        initializeData();
    }, [props]);

    const initializeData = async () => {
        const searchResponse = await searchMetObjects(props.searchParams);
        if (searchResponse.isSuccess) {
            const objectIds = (searchResponse.data.objectIDs ?? [])
                .filter(id => props.excludeObjectId ? (props.excludeObjectId !== id) : true)
                .slice(0, props.numberOfObjects);
            const response = await getMetObjectsWithTheIds({ objectIds });
            if (response) {
                setObjects(response);
            }
        }
    }

    const renderItem = (renderItem: ListRenderItemInfo<MetObject>) => {
        return <View style={styles.cardWrapper}>
            <ObjectCard
                item={renderItem.item}
                options={{
                    disableCountry: true,
                    disableFavoriteButton: true,
                    disableObjectName: true,
                    squareImage: true,
                    numberOfArtistNameLinesLimit: 1,
                    numberOfTitleLinesLimit: 2,
                    backgroundColor: palette.rose,
                    textColor: palette.softYellow
                }}
            />
        </View>
    }

    if (objects && (objects?.length > 0)) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{props.title}</Text>
                <FlatList
                    style={styles.list}
                    horizontal
                    contentContainerStyle={styles.listContent}
                    data={objects}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}

                />
            </View>

        );

    }

}

export default HorizontalObjectScroll;

const styles = StyleSheet.create({
    container: {
        gap: rem(12)
    },
    title: {
        ...setFont({
            color: palette.cream,
            fontSize: rem(22)
        })

    },
    list: {
        marginHorizontal: rem(-16),
    },
    listContent: {
        gap: rem(10),
        paddingHorizontal: rem(16),

    },
    cardWrapper: {
        width: rem(200)
    }

});