import AuthContainer from "@/components/AuthContainer";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { Colors, FontSizes, FontWeights, Spacing } from "@/theme";
import { loginSchema } from "@/utils/validation";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <AuthContainer
      title="SkySearch"
      subtitle="Your gateway to the world"
      cardTitle="Welcome Back"
      cardSubtitle="Sign in to continue"
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={() => {
          router.replace("/search");
        }}
        enableReinitialize
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <FormInput
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
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

            <Button onPress={handleSubmit as any} title="Sign In" />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <Pressable style={styles.linkButton} onPress={() => router.push("/signup")}>
              <Text style={styles.linkText}>
                {"Don't have an account?"} <Text style={styles.linkTextBold}>Sign Up</Text>
              </Text>
            </Pressable>

            <View style={styles.demoNote}>
              <Ionicons name="information-circle-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.demoNoteText}>Demo mode - Use any credentials</Text>
            </View>
          </>
        )}
      </Formik>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
  },
  linkButton: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  linkText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  linkTextBold: {
    color: Colors.primary,
    fontWeight: FontWeights.bold,
  },
  demoNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  demoNoteText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    marginLeft: Spacing.xs,
  },
  featuresSection: {
    marginTop: Spacing.md,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  featureItem: {
    alignItems: "center",
    padding: Spacing.md,
  },
  featureText: {
    color: Colors.white,
    fontSize: FontSizes.xs,
    marginTop: Spacing.sm,
    fontWeight: FontWeights.medium,
  },
});
