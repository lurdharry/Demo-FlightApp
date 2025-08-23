import { PassengerType, SearchFormValues } from "@/types";
import { searchSchema } from "@/utils/validation";
import { addDays } from "date-fns/addDays";
import { FormikConfig, useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";

const initialValues: SearchFormValues = {
  origin: "Lagos",
  destination: "London",
  tripType: "roundtrip",
  departDate: new Date(),
  returnDate: addDays(new Date(), 7),
  adults: 1,
  children: 0,
  infants: 0,
  cabinClass: "economy",
};

interface useSearchFormProps {
  handleSubmit: FormikConfig<SearchFormValues>["onSubmit"];
}

export const useSearchForm = ({ handleSubmit }: useSearchFormProps) => {
  // Modal states
  const [isDepartPickerVisible, setDepartPickerVisible] = useState(false);
  const [isReturnPickerVisible, setReturnPickerVisible] = useState(false);
  const [showPassengerModal, setShowPassengerModal] = useState(false);

  // form handler
  const formik = useFormik({
    initialValues,
    validationSchema: searchSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const passengers = useMemo(
    () => ({
      adults: formik.values.adults,
      children: formik.values.children,
      infants: formik.values.infants,
    }),
    [formik.values.adults, formik.values.children, formik.values.infants]
  );

  const handleDepartDateConfirm = useCallback(
    (date: Date) => {
      setDepartPickerVisible(false);
      formik.setFieldValue("departDate", date);
      // Auto-adjust return date to current date
      if (formik.values.returnDate < date) {
        formik.setFieldValue("returnDate", date);
      }
    },
    [formik]
  );

  const handleReturnDateConfirm = useCallback(
    (date: Date) => {
      setReturnPickerVisible(false);
      formik.setFieldValue("returnDate", date);
    },
    [formik]
  );

  // Passenger update handler
  const handlePassengerUpdate = useCallback(
    (type: PassengerType, increment: boolean) => {
      const currentValue = formik.values[type];
      const newValue = increment
        ? currentValue + 1
        : Math.max(type === "adults" ? 1 : 0, currentValue - 1);
      formik.setFieldValue(type, newValue);
    },
    [formik]
  );

  return {
    formik,
    passengers,

    isDepartPickerVisible,
    toggleDepartPicker: (value: boolean) => setDepartPickerVisible(value),
    handleDepartDateConfirm,

    isReturnPickerVisible,
    toggleReturnPicker: (value: boolean) => setReturnPickerVisible(value),
    handleReturnDateConfirm,

    showPassengerModal,
    togglePassengerModal: (value: boolean) => setShowPassengerModal(value),
    handlePassengerUpdate,
  };
};
