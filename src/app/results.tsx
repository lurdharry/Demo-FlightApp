import { useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import FlightCard from "@/components/FlightCard";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import ResultsHeader from "@/components/ResultsHeader";
import { useFlightSearchContext } from "@/context/FlightSearchContext";
import { Colors, Spacing } from "@/theme";
import { FlightItinerary } from "@/types";

export default function ResultsScreen() {
  const { searchResults, origin, destination, departureDate, returnDate, tripType } =
    useFlightSearchContext();
  const router = useRouter();

  const _renderItem: ListRenderItem<FlightItinerary> = useCallback(
    ({ item }) => <FlightCard data={item} />,
    []
  );

  const _listEmpty = useMemo(() => <ListEmptyComponent />, []);

  return (
    <View style={styles.container}>
      <ResultsHeader
        origin={origin}
        destination={destination}
        departureDate={departureDate}
        returnDate={returnDate}
        tripType={tripType}
        resultCount={searchResults.length}
        onBackPress={() => router.back()}
      />

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={_renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={_listEmpty}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
});
