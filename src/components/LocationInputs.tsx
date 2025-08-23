import { Colors, Shadows, Spacing } from "@/theme";
import { SearchFormValues } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { FormikProps } from "formik";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import FormInput from "./FormInput";

type LocationInputsProps = Pick<
  FormikProps<SearchFormValues>,
  "values" | "errors" | "touched" | "handleChange" | "handleBlur" | "setFieldValue"
>;

const LocationInputs: React.FC<LocationInputsProps> = (props) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = props;

  const swapLocations = useCallback(() => {
    const tempOrigin = values.origin;
    const tempDest = values.destination;
    setFieldValue("origin", tempDest);
    setFieldValue("destination", tempOrigin);
  }, [setFieldValue, values.destination, values.origin]);

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
        onPress={swapLocations}
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
  swapButton: {
    backgroundColor: Colors.white,
    alignSelf: "center",
    ...Shadows.sm,
  },
});

export default LocationInputs;
