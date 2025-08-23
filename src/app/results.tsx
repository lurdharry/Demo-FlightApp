import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import FlightCard from "@/components/FlightCard";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import ResultsHeader from "@/components/ResultsHeader";
import { useFlightSearchContext } from "@/context/FlightSearchContext";
import { Colors, Spacing } from "@/theme";

export default function ResultsScreen() {
  const { searchResults, origin, destination, departureDate, returnDate, tripType } =
    useFlightSearchContext();
  const router = useRouter();

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
        renderItem={({ item }) => <FlightCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ListEmptyComponent />}
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
