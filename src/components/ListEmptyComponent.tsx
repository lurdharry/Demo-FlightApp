import { Colors, FontSizes, FontWeights, Spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ListEmptyComponent: React.FC = () => {
  return (
    <View style={styles.empty}>
      <Ionicons name="airplane-outline" size={48} color={Colors.textSecondary} />
      <Text style={styles.emptyText}>No flights found</Text>
      <Text style={styles.emptySubtext}>Try adjusting your search</Text>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  empty: {
    alignItems: "center",
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});
