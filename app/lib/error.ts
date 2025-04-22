export const getErrorMessage = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof (error.response as any).data === "object"
  ) {
    return (error.response as any).data.message || "Unexpected error occurred.";
  }

  if (error instanceof Error) return error.message;

  return "An unknown error occurred.";
};
