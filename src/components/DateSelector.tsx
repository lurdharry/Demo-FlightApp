import { BorderRadius, Colors, FontSizes, FontWeights, Spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface DateSelectorProps {
  departDate: Date;
  returnDate?: Date;
  onDepartPress: () => void;
  onReturnPress?: () => void;
  showReturn: boolean;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  departDate,
  returnDate,
  onDepartPress,
  onReturnPress,
  showReturn,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.dateButton} onPress={onDepartPress}>
        <View style={styles.dateContent}>
          <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
          <View style={styles.dateTextContainer}>
            <Text style={styles.dateLabel}>Departure</Text>
            <Text style={styles.dateValue}>{formatDate(departDate)}</Text>
          </View>
        </View>
      </Pressable>

      {showReturn && returnDate && (
        <Pressable style={styles.dateButton} onPress={onReturnPress}>
          <View style={styles.dateContent}>
            <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateLabel}>Return</Text>
              <Text style={styles.dateValue}>{formatDate(returnDate)}</Text>
            </View>
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  dateButton: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTextContainer: {
    marginLeft: Spacing.sm,
  },
  dateLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  dateValue: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
  },
});

export default DateSelector;
