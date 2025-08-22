import { CABIN_CLASSES } from "@/constants/flight";
import { BorderRadius, Colors, FontSizes, Spacing } from "@/theme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";

interface CabinClassSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const CabinClassSelector: React.FC<CabinClassSelectorProps> = ({ value, onChange }) => {
  const [visible, setVisible] = React.useState(false);

  const selectedClass = CABIN_CLASSES.find((c) => c.value === value) || CABIN_CLASSES[0];

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableOpacity style={styles.optionButton} onPress={() => setVisible(true)}>
            <MaterialIcons name="airline-seat-recline-normal" size={20} color={Colors.primary} />
            <Text style={styles.optionText}>{selectedClass.label}</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
          </TouchableOpacity>
        }
        anchorPosition="bottom"
      >
        {CABIN_CLASSES.map((cabin) => (
          <Menu.Item
            key={cabin.value}
            leadingIcon={() => (
              <MaterialIcons
                name={cabin.icon}
                size={22}
                color={value === cabin.value ? Colors.primary : Colors.textSecondary}
              />
            )}
            title={cabin.label}
            onPress={() => {
              onChange(cabin.value);
              setVisible(false);
            }}
            trailingIcon={value === cabin.value ? "check" : undefined}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
});

export default CabinClassSelector;
