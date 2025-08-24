import { BorderRadius, Colors, FontSizes, FontWeights, Shadows, Spacing } from "@/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { Button as BTN, ButtonProps as BTNProps } from "react-native-paper";

interface ButtonProps extends Omit<BTNProps, "children"> {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, ...rest }) => {
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
};

export default Button;

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
