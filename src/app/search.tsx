import Button from "@/components/Button";
import CabinClassSelector from "@/components/CabinClassSelector";
import DateSelector from "@/components/DateSelector";
import LocationInputs from "@/components/LocationInputs";
import PassengerModal from "@/components/PassengerModal";
import PassengerSelector from "@/components/PassengerSelector";
import TripTypeSelector from "@/components/TripTypeSelector";
import { useFlightSearchContext } from "@/context/FlightSearchContext";
import { useFlightSearch } from "@/hooks/useFlightSearch";
import { useSearchForm } from "@/hooks/useSearchForm";
import { BorderRadius, Colors, FontSizes, FontWeights, Shadows, Spacing } from "@/theme";
import { SearchFormValues } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Card } from "react-native-paper";

export default function SearchScreen() {
  const router = useRouter();
  const { isPending, mutateAsync } = useFlightSearch();
  const { setSearchResults } = useFlightSearchContext();

  const handleSearch = useCallback(
    async (values: SearchFormValues) => {
      const searchParams = {
        ...values,
        departDate: formatDate(values.departDate),
        returnDate: values.tripType === "roundtrip" ? formatDate(values.returnDate) : undefined,
      };

      await mutateAsync(searchParams, {
        onSuccess(data) {
          if (data?.data.itineraries?.length > 0) {
            setSearchResults({
              searchResults: data.data.itineraries,
              origin: values.origin,
              destination: values.destination,
              departureDate: searchParams.departDate,
              returnDate: searchParams.returnDate,
              tripType: values.tripType,
            });
            router.push("/results");
          } else {
            Alert.alert(
              "No Results",
              "Looks like we couldn't find flights for your trip. Try changing your dates or search again."
            );
          }
        },
        onError(error: any) {
          Alert.alert(
            "Search Error",
            error?.message || "Failed to search flights. Please try again."
          );
        },
      });
    },
    [mutateAsync, router, setSearchResults]
  );

  const {
    formik,
    passengers,
    activeDatePicker,
    handleDateConfirm,
    handleDateCancel,
    showDepartPicker,
    showReturnPicker,
    showPassengerModal,
    togglePassengerModal,
    handlePassengerUpdate,
  } = useSearchForm({ handleSubmit: handleSearch });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.header}>
        <Text style={styles.headerTitle}>Where to next?</Text>
        <Text style={styles.headerSubtitle}>Search flights to over 1000+ destinations</Text>
      </LinearGradient>

      {/* Search Form */}
      <Card style={styles.searchCard}>
        <Card.Content>
          <TripTypeSelector
            value={formik.values.tripType}
            onChange={(value) => formik.setFieldValue("tripType", value)}
          />

          <LocationInputs
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            setFieldValue={formik.setFieldValue}
          />

          <DateSelector
            departDate={formik.values.departDate}
            returnDate={formik.values.returnDate}
            showReturn={formik.values.tripType === "roundtrip"}
            onDepartPress={showDepartPicker}
            onReturnPress={showReturnPicker}
          />

          <View style={styles.passengerOptionContainer}>
            <PassengerSelector
              passengers={passengers}
              onPassengerPress={() => togglePassengerModal(true)}
            />
            <CabinClassSelector
              value={formik.values.cabinClass}
              onChange={(value) => formik.setFieldValue("cabinClass", value)}
            />
          </View>

          <Button
            onPress={() => formik.handleSubmit()}
            loading={isPending}
            disabled={isPending || !formik.isValid}
            icon="airplane"
            title={isPending ? "Searching..." : "Search Flights"}
          />
        </Card.Content>
      </Card>

      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={activeDatePicker !== null}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
        date={activeDatePicker === "depart" ? formik.values.departDate : formik.values.returnDate}
        minimumDate={activeDatePicker === "depart" ? new Date() : formik.values.departDate}
        display="inline"
      />

      {/* Passenger Modal */}
      <PassengerModal
        visible={showPassengerModal}
        passengers={passengers}
        onClose={() => togglePassengerModal(false)}
        onUpdate={handlePassengerUpdate}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.xl,
    paddingTop: 50,
    paddingBottom: 80,
  },
  headerTitle: {
    fontSize: FontSizes.title,
    fontWeight: FontWeights.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.whiteTransparent,
  },
  searchCard: {
    marginHorizontal: Spacing.lg,
    marginTop: -60,
    borderRadius: BorderRadius.xl,
    ...Shadows.lg,
  },
  passengerOptionContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
});
