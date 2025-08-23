import { DatePickerType, PassengerType, SearchFormValues } from "@/types";
import { searchSchema } from "@/utils/validation";
import { addDays } from "date-fns/addDays";
import { FormikConfig, useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";

const INITIAL_VALUES: SearchFormValues = {
  origin: "",
  destination: "",
  tripType: "roundtrip",
  departDate: new Date(),
  returnDate: addDays(new Date(), 7),
  adults: 1,
  children: 0,
  infants: 0,
  cabinClass: "economy",
};

const MIN_PASSENGERS = {
  adults: 1,
  children: 0,
  infants: 0,
};

interface useSearchFormProps {
  handleSubmit: FormikConfig<SearchFormValues>["onSubmit"];
}

export const useSearchForm = ({ handleSubmit }: useSearchFormProps) => {
  // Modal states
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [activeDatePicker, setActiveDatePicker] = useState<DatePickerType>(null);

  // form handler
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
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

  const handleDateConfirm = useCallback(
    (date: Date) => {
      if (activeDatePicker === "depart") {
        formik.setFieldValue("departDate", date);
        // Auto-adjust return date if it's before the new departure date
        if (formik.values.returnDate && formik.values.returnDate < date) {
          formik.setFieldValue("returnDate", date);
        }
      } else if (activeDatePicker === "return") {
        formik.setFieldValue("returnDate", date);
      }
      setActiveDatePicker(null);
    },
    [activeDatePicker, formik]
  );

  const handleDateCancel = useCallback(() => {
    setActiveDatePicker(null);
  }, []);

  const showDepartPicker = useCallback(() => {
    setActiveDatePicker("depart");
  }, []);

  const showReturnPicker = useCallback(() => {
    setActiveDatePicker("return");
  }, []);

  const handlePassengerUpdate = useCallback(
    (type: PassengerType, increment: boolean) => {
      const currentValue = formik.values[type];
      const minValue = MIN_PASSENGERS[type];
      const newValue = increment ? currentValue + 1 : Math.max(minValue, currentValue - 1);
      formik.setFieldValue(type, newValue);
    },
    [formik]
  );

  return {
    formik,
    passengers,

    activeDatePicker,
    handleDateConfirm,
    handleDateCancel,
    showDepartPicker,
    showReturnPicker,

    showPassengerModal,
    togglePassengerModal: (value: boolean) => setShowPassengerModal(value),
    handlePassengerUpdate,
  };
};
