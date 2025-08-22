import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AppFeatures() {
  return (
    <View style={styles.featuresSection}>
      <View style={styles.featureRow}>
        <View style={styles.featureItem}>
          <Ionicons name="search-outline" size={28} color="white" />
          <Text style={styles.featureText}>Smart Search</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="pricetag-outline" size={28} color="white" />
          <Text style={styles.featureText}>Best Prices</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="shield-checkmark-outline" size={28} color="white" />
          <Text style={styles.featureText}>Secure</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  featuresSection: {
    marginTop: 10,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  featureItem: {
    alignItems: "center",
    padding: 10,
  },
  featureText: {
    color: "white",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "500",
  },
});
