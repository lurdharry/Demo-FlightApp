import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

import { PASSENGER_INFO } from "@/constants/passenger";
import { BorderRadius, Colors, FontSizes, FontWeights, Spacing } from "@/theme";
import { PassengerCount, PassengerType } from "@/types";
import Button from "./Button";

interface PassengerModalProps {
  visible: boolean;
  passengers: PassengerCount;
  onClose: () => void;
  onUpdate: (type: PassengerType, increment: boolean) => void;
}

const PassengerModal: React.FC<PassengerModalProps> = ({
  visible,
  passengers,
  onClose,
  onUpdate,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Passengers</Text>

          {PASSENGER_INFO.map((item) => (
            <View key={item.value} style={styles.passengerRow}>
              <View>
                <Text style={styles.passengerType}>{item.label}</Text>
                <Text style={styles.passengerAge}>{item.age}</Text>
              </View>
              <View style={styles.passengerCounter}>
                <IconButton
                  icon="minus-circle-outline"
                  size={24}
                  onPress={() => onUpdate(item.value, false)}
                  disabled={
                    item.value === "adults" ? passengers.adults <= 1 : passengers[item.value] <= 0
                  }
                />
                <Text style={styles.passengerCount}>{passengers[item.value]}</Text>
                <IconButton
                  icon="plus-circle-outline"
                  size={24}
                  onPress={() => onUpdate(item.value, true)}
                />
              </View>
            </View>
          ))}

          <Button mode="contained" onPress={onClose} title="Done" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.xl,
  },
  modalTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
  },
  passengerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  passengerType: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
  },
  passengerAge: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  passengerCounter: {
    flexDirection: "row",
    alignItems: "center",
  },
  passengerCount: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
    marginHorizontal: Spacing.md,
  },
});

export default PassengerModal;
