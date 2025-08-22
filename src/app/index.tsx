import AppFeatures from "@/components/AppFeatures";
import FormInput from "@/components/FormInput";
import { Colors } from "@/theme/colors";
import { FontSizes, FontWeights } from "@/theme/fonts";
import { BorderRadius, Spacing } from "@/theme/spacing";
import { loginSchema } from "@/utils/schema";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  const router = useRouter();

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
              <View style={styles.logoContainer}>
                <Ionicons name="airplane" size={60} color="white" />
              </View>
              <Text style={styles.appName}>SkySearch</Text>
              <Text style={styles.tagline}>Your gateway to the world</Text>
            </View>

            {/* Login Form */}
            <View style={styles.formCard}>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.subtitleText}>Sign in to continue</Text>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={() => {
                  router.push("/search");
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View style={styles.form}>
                    <FormInput
                      label="Email"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      error={errors.email}
                      touched={touched.email}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      icon="mail-outline"
                    />

                    <FormInput
                      label="Password"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      error={errors.password}
                      touched={touched.password}
                      placeholder="Enter your password"
                      secureTextEntry
                      icon="lock-closed-outline"
                    />

                    <Button
                      mode="contained"
                      onPress={handleSubmit as any}
                      style={styles.loginButton}
                      contentStyle={styles.loginButtonContent}
                      labelStyle={styles.loginButtonText}
                    >
                      Sign In
                    </Button>

                    <View style={styles.demoNote}>
                      <Ionicons name="information-circle-outline" size={16} color="#666" />
                      <Text style={styles.demoNoteText}>Demo mode - Use any credentials</Text>
                    </View>
                  </View>
                )}
              </Formik>
            </View>

            {/* Features Section */}
            <AppFeatures />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

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
    paddingTop: 60,
    paddingBottom: Spacing.xxxl,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: Spacing.xxxl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.backgroundOverlay,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  appName: {
    fontSize: FontSizes.header,
    fontWeight: FontWeights.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  tagline: {
    fontSize: FontSizes.lg,
    color: Colors.whiteTransparent,
  },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xxl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: Spacing.xxxl,
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
  loginButton: {
    marginTop: Spacing.md,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primary,
  },
  loginButtonContent: {
    paddingVertical: Spacing.sm,
  },
  loginButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  demoNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.xl,
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  demoNoteText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    marginLeft: Spacing.xs,
  },
});
