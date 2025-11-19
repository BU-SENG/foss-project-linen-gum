export const handleApiError = (error) => {
  return (
    error?.response?.data ||
    error?.response || { message: "Something went wrong. Please try again." }
  );
};
