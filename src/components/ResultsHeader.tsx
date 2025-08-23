import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors, FontSizes, FontWeights, Spacing } from "@/theme";
import { TripType } from "@/types";
import { formatDisplayDate } from "@/utils/formatDate";

interface ResultsHeaderProps {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  tripType: TripType;
  resultCount: number;
  onBackPress: () => void;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  origin,
  destination,
  departureDate,
  returnDate,
  tripType,
  resultCount,
  onBackPress,
}) => {
  const formattedDate = useMemo(() => {
    if (!departureDate) return "";

    const depDate = formatDisplayDate(departureDate);
    if (tripType === "roundtrip" && returnDate) {
      const retDate = formatDisplayDate(returnDate);
      return `${depDate} - ${retDate}`;
    }
    return depDate;
  }, [departureDate, returnDate, tripType]);

  return (
    <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color={Colors.white} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={styles.route}>
          {origin} → {destination}
        </Text>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.resultCount}>
          {resultCount} flight{resultCount !== 1 ? "s" : ""} found
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: Spacing.sm,
    marginRight: Spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  route: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.white,
  },
  dateText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: Colors.white,
    marginTop: 2,
  },
  resultCount: {
    fontSize: FontSizes.sm,
    color: Colors.whiteTransparent,
    marginTop: 4,
  },
});

export default ResultsHeader;
