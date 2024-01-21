import { useState } from "react";

const useErrorState = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  // For showing Error message on every click
  const [refreshError, setRefreshError] = useState(0);
  // Get the error message from response
  const errorSet = (err) => {
    let errorMessage;
    if (err.response !== undefined) {
      errorMessage = err.response.data.message;
    } else {
      errorMessage = err;
    }
    setErrorMessage(errorMessage);
    setRefreshError((count) => count + 1);
  };

  return { errorMessage, errorSet, refreshError };
};

export default useErrorState;
