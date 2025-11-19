export const handleApiError = (error) => {
  const err = error?.response?.data || error?.response || {};
  return {
    message: err.message || "Something went wrong. Please try again.",
    ...err,
  };
};
