import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <ErrorBoundary>
        <Toaster position="top-center" reverseOrder={false} autoClose={3000} />
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
}

export default App;
