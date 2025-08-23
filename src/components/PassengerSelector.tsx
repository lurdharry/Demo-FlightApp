import { BorderRadius, Colors, FontSizes, Spacing } from "@/theme";
import { PassengerCount } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface PassengerSelectorProps {
  passengers: PassengerCount;
  onPassengerPress: () => void;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({ passengers, onPassengerPress }) => {
  const totalPassengersLabel = useMemo(() => {
    const totalPassengers = passengers.adults + passengers.children + passengers.infants;
    return `${totalPassengers} Passenger${totalPassengers > 1 ? "s" : ""}`;
  }, [passengers]);

  return (
    <TouchableOpacity style={styles.optionButton} onPress={onPassengerPress}>
      <Ionicons name="people-outline" size={20} color={Colors.primary} />
      <Text style={styles.optionText}>{totalPassengersLabel}</Text>
      <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
});

export default PassengerSelector;
