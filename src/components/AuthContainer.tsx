import { BorderRadius, Colors, FontSizes, FontWeights, Shadows, Spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

interface AuthContainerProps {
  title: string;
  subtitle: string;
  cardTitle: string;
  cardSubtitle: string;
  logoSize?: number;
}

const AuthContainer: React.FC<PropsWithChildren<AuthContainerProps>> = ({
  title,
  subtitle,
  cardTitle,
  cardSubtitle,
  children,
  logoSize = 60,
}) => {
  return (
    <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={[styles.logoContainer, { width: logoSize + 40, height: logoSize + 40 }]}>
                <Ionicons name="airplane" size={logoSize} color={Colors.white} />
              </View>
              <Text style={styles.appName}>{title}</Text>
              <Text style={styles.tagline}>{subtitle}</Text>
            </View>

            {/* Form Card */}
            <View style={styles.formCard}>
              <Text style={styles.welcomeText}>{cardTitle}</Text>
              <Text style={styles.subtitleText}>{cardSubtitle}</Text>
              <View style={styles.form}>{children}</View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: 64,
    paddingBottom: Spacing.xxxl,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  logoContainer: {
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.backgroundOverlay,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  appName: {
    fontSize: FontSizes.title,
    fontWeight: FontWeights.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  tagline: {
    fontSize: FontSizes.md,
    color: Colors.whiteTransparent,
  },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xxl,
    ...Shadows.lg,
    marginBottom: Spacing.xl,
  },
  welcomeText: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitleText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },
  form: {
    width: "100%",
  },
  bottomSection: {
    marginTop: Spacing.md,
  },
});

export default AuthContainer;
