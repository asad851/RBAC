import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const ErrorContext = createContext();

export const useError = () => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [severity, setSeverity] = useState(null);

  const showError = (message, severity) => {
    setError(message);
    setSeverity(severity);
  };

  const hideError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ showError, hideError }}>
      {children}
      <Snackbar open={!!error} autoHideDuration={3000} onClose={hideError}>
        <Alert
          onClose={hideError}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </ErrorContext.Provider>
  );
};
