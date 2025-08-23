import { BorderRadius, Colors, FontSizes, FontWeights, Shadows, Spacing } from "@/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { Button as BTN, ButtonProps as BTNProps } from "react-native-paper";

interface ButtonProps extends Omit<BTNProps, "children"> {
  title: string;
}

export default function Button({ title, onPress, ...rest }: ButtonProps) {
  return (
    <BTN
      mode="contained"
      onPress={onPress}
      style={styles.loginButton}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonText}
      {...rest}
    >
      {title}
    </BTN>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    marginTop: Spacing.md,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryDark,
    ...Shadows.primary,
  },
  buttonContent: {
    paddingVertical: Spacing.sm,
  },
  buttonText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: Colors.white,
  },
});
