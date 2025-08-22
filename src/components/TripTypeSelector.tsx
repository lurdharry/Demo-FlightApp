import { TRIP_TYPES } from "@/constants/flight";
import { Spacing } from "@/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

interface TripTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const TripTypeSelector: React.FC<TripTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <SegmentedButtons
      value={value}
      onValueChange={onChange}
      buttons={TRIP_TYPES}
      style={styles.segmentedButtons}
    />
  );
};

const styles = StyleSheet.create({
  segmentedButtons: {
    marginBottom: Spacing.xl,
  },
});

export default TripTypeSelector;
