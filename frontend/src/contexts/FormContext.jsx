import React, { createContext, useContext, useReducer } from "react";

const FormContext = createContext();

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "RESET_FORM":
      return {
        ...initialFormState,
      };
    default:
      return state;
  }
};

const initialFormState = {
  name: "",
  email: "",
  company: "",
  service_type: "",
  budget_range: "",
  message: "",
  errors: {},
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const setField = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const setErrors = (errors) => {
    dispatch({ type: "SET_ERRORS", errors });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const validateForm = () => {
    const errors = {};

    if (!formState.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formState.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Email is invalid";
    }

    if (!formState.service_type) {
      errors.service_type = "Please select a service";
    }

    if (!formState.message.trim()) {
      errors.message = "Message is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const value = {
    formState,
    setField,
    setErrors,
    resetForm,
    validateForm,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
