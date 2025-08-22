import AuthContainer from "@/components/AuthContainer";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { BorderRadius, Colors, FontSizes, FontWeights, Shadows, Spacing } from "@/theme";
import { signupSchema } from "@/utils/validation";

import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <AuthContainer
      title="Join SkySearch"
      subtitle="Start your journey today"
      cardTitle="Create Account"
      cardSubtitle="Sign up to get started"
      logoSize={50}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          console.log("Signup values:", values);
          router.push("/search");
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.nameRow}>
              <View style={styles.halfWidth}>
                <FormInput
                  label="First Name"
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  error={errors.firstName}
                  touched={touched.firstName}
                  placeholder="John"
                  icon="person-outline"
                />
              </View>
              <View style={styles.halfWidth}>
                <FormInput
                  label="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  error={errors.lastName}
                  touched={touched.lastName}
                  placeholder="Doe"
                />
              </View>
            </View>

            <FormInput
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              placeholder="john.doe@example.com"
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
              placeholder="Min 6 characters"
              secureTextEntry
              icon="lock-closed-outline"
            />

            <FormInput
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              placeholder="Re-enter password"
              secureTextEntry
              icon="lock-closed-outline"
            />

            <Button onPress={handleSubmit as any} title="Create Account" />

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By signing up, you agree to our{" "}
                <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>

            <View style={styles.divider}>
              <Divider style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <Divider style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.linkButton} onPress={() => router.dismiss()}>
              <Text style={styles.linkText}>
                Already have an account? <Text style={styles.linkTextBold}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  nameRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
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
  },
  termsContainer: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  termsText: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: FontWeights.semiBold,
  },
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
  },
  linkText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  linkTextBold: {
    color: Colors.primary,
    fontWeight: FontWeights.bold,
  },
  benefitsSection: {
    marginTop: Spacing.md,
  },
  benefitsTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: Colors.white,
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  benefitText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    marginLeft: Spacing.sm,
  },
});
