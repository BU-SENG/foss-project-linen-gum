import { motion } from "framer-motion";

export default function ErrorFallback({ error }) {
  const message =
    error?.message ||
    (typeof error === "string" ? error : "An unexpected error has occurred.");

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-red-50 text-red-700"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      role="alert"
      aria-live="assertive"
    >
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h1>

      <p className="text-lg mb-4 wrap-break-word whitespace-pre-wrap">{message}</p>

      <button
        onClick={() => window.location.reload()}
        className="bg-red-600 text-white px-6 cursor-pointer py-2 rounded-lg shadow hover:bg-red-700 transition-colors"
      >
        Reload Page
      </button>
    </motion.div>
  );
}
