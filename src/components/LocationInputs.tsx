import { Colors, Shadows, Spacing } from "@/theme";
import { SearchFormValues } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { FormikProps } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import FormInput from "./FormInput";

interface LocationInputsProps {
  formik: FormikProps<SearchFormValues>;
}

const LocationInputs: React.FC<LocationInputsProps> = ({ formik }) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <View style={styles.container}>
      <FormInput
        label="From"
        value={values.origin}
        onChangeText={handleChange("origin")}
        onBlur={handleBlur("origin")}
        error={errors.origin}
        touched={touched.origin}
        placeholder="City or Airport"
        left={
          <TextInput.Icon
            icon={() => <Ionicons name="location-outline" size={20} color={Colors.primary} />}
          />
        }
      />

      <IconButton
        icon="swap-vertical"
        size={24}
        style={styles.swapButton}
        iconColor={Colors.primary}
      />

      <FormInput
        label="To"
        value={values.destination}
        onChangeText={handleChange("destination")}
        onBlur={handleBlur("destination")}
        error={errors.destination}
        touched={touched.destination}
        placeholder="City or Airport"
        left={
          <TextInput.Icon
            icon={() => <Ionicons name="navigate-outline" size={20} color={Colors.primary} />}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  locationInputs: {
    position: "relative",
  },

  swapButton: {
    zIndex: 1,
    backgroundColor: Colors.white,
    alignSelf: "center",
    ...Shadows.sm,
  },
});

export default LocationInputs;
