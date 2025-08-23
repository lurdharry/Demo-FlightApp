import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BorderRadius, Colors, FontSizes, FontWeights, Shadows, Spacing } from "@/theme";
import { FlightItinerary } from "@/types";
import { formatDuration, formatTime } from "@/utils/formatDate";

interface FlightCardProps {
  data: FlightItinerary;
}

const FlightCard = memo<FlightCardProps>(({ data }) => {
  return (
    <View style={styles.card}>
      {/* Price Badge */}
      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>{data.price.formatted}</Text>
      </View>

      {data.legs.map((leg, index) => (
        <View key={`${leg.id}_${index}`}>
          {/* Leg Header - Only show for multi-leg flights */}
          {data.legs.length > 1 && (
            <View style={styles.legHeader}>
              <Text style={styles.legLabel}>{index === 0 ? "Outbound" : "Return"}</Text>
            </View>
          )}

          <View style={styles.legContainer}>
            {/* Departure */}
            <View style={styles.endpoint}>
              <Text style={styles.time}>{formatTime(leg.departure)}</Text>
              <Text style={styles.airportCode}>{leg.origin.displayCode}</Text>
              <Text style={styles.cityName}>{leg.origin.city}</Text>
            </View>

            {/* Flight Info */}
            <View style={styles.flightInfo}>
              <Text style={styles.duration}>{formatDuration(leg.durationInMinutes)}</Text>
              <View style={styles.routeLine}>
                <View style={styles.dot} />
                <View style={styles.line} />
                <Ionicons
                  name="airplane"
                  size={14}
                  color={Colors.primary}
                  style={{ transform: [{ rotate: "90deg" }] }}
                />
              </View>
              {leg.stopCount === 0 ? (
                <Text style={styles.nonstop}>Direct</Text>
              ) : (
                <Text style={styles.stops}>
                  {leg.stopCount} stop{leg.stopCount > 1 ? "s" : ""}
                </Text>
              )}
            </View>

            {/* Arrival */}
            <View style={styles.endpoint}>
              <Text style={styles.time}>{formatTime(leg.arrival)}</Text>
              <Text style={styles.airportCode}>{leg.destination.displayCode}</Text>
              <Text style={styles.cityName}>{leg.destination.city}</Text>
              {leg.timeDeltaInDays > 0 && (
                <View style={styles.nextDayBadge}>
                  <Text style={styles.nextDayText}>+{leg.timeDeltaInDays}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Airline Info - More compact */}
          <View style={styles.airlineContainer}>
            <MaterialIcons name="flight" size={12} color={Colors.textSecondary} />
            <Text style={styles.airlineName}>{leg.carriers.marketing[0]?.name}</Text>
          </View>

          {index < data.legs.length - 1 && <View style={styles.legDivider} />}
        </View>
      ))}

      {/* Compact Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.badges}>
          {data.isSelfTransfer && (
            <View style={[styles.badge, styles.warningBadge]}>
              <Ionicons name="warning-outline" size={10} color={Colors.warning} />
              <Text style={styles.badgeText}>Self Transfer</Text>
            </View>
          )}
          {!data.farePolicy.isChangeAllowed && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Non-refundable</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.selectButton}>
          <Text style={styles.selectText}>Select</Text>
          <Ionicons name="chevron-forward" size={14} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

FlightCard.displayName = "FlightCard";

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Shadows.md,
    overflow: "hidden",
  },
  priceBadge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    zIndex: 1,
  },
  priceText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
  },
  legHeader: {
    backgroundColor: Colors.backgroundLight,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  legLabel: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.semiBold,
    color: Colors.textSecondary,
    textTransform: "uppercase",
  },
  legContainer: {
    flexDirection: "row",
    padding: Spacing.md,
    alignItems: "center",
  },
  endpoint: {
    flex: 1,
    alignItems: "center",
  },
  time: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
  },
  airportCode: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    color: Colors.primary,
    marginTop: 2,
  },
  cityName: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  flightInfo: {
    flex: 1.2,
    alignItems: "center",
    paddingHorizontal: Spacing.sm,
  },
  duration: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeights.medium,
  },
  routeLine: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.xs,
    width: 60,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.xs,
  },
  nonstop: {
    fontSize: FontSizes.xs,
    color: Colors.success,
    fontWeight: FontWeights.semiBold,
  },
  stops: {
    fontSize: FontSizes.xs,
    color: Colors.warning,
  },
  nextDayBadge: {
    backgroundColor: Colors.warning,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 1,
    borderRadius: BorderRadius.sm,
    marginTop: 2,
  },
  nextDayText: {
    fontSize: FontSizes.xs,
    color: Colors.white,
    fontWeight: FontWeights.semiBold,
  },
  airlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  airlineName: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  legDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.md,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.backgroundLight,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  badges: {
    flexDirection: "row",
    gap: Spacing.xs,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    gap: 2,
  },
  warningBadge: {
    backgroundColor: Colors.warning,
  },
  badgeText: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  selectText: {
    color: Colors.white,
    fontWeight: FontWeights.semiBold,
    fontSize: FontSizes.xs,
  },
});

export default FlightCard;
