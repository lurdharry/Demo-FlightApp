import { Colors } from "@/theme/colors";
import { FontSizes } from "@/theme/fonts";
import { Spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

interface FormInputProps extends Omit<TextInputProps, "theme" | "mode" | "error"> {
  error?: string;
  touched?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
}

const FormInput: React.FC<FormInputProps> = ({
  error,
  touched,
  secureTextEntry = false,
  icon,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const hasError = !!(error && touched);

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        error={hasError}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        outlineColor={Colors.border}
        activeOutlineColor={Colors.primary}
        style={styles.input}
        left={
          icon ? (
            <TextInput.Icon
              icon={() => <Ionicons name={icon} size={20} color={Colors.textSecondary} />}
            />
          ) : undefined
        }
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={() => (
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color={Colors.textSecondary}
                />
              )}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          ) : undefined
        }
        {...rest}
      />
      {hasError && (
        <HelperText type="error" visible={hasError} style={styles.errorText}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  input: {
    backgroundColor: Colors.white,
  },
  errorText: {
    fontSize: FontSizes.xs,
    marginTop: -4,
  },
});

export default FormInput;
