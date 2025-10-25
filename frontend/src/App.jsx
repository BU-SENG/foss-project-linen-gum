import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
