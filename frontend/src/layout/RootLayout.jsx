import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

// Import preloader component
import Preloader from "../components/Preloader";

// Lazy load Header and Footer components to optimize performance
const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));

/**
 * RootLayout component
 * Acts as the main layout wrapper for all pages.
 */
const RootLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        {/* Suspense wrapper shows Preloader while Header component loads */}
        <Suspense fallback={<Preloader />}>
          {/* Lazy loaded Header */}
          <Header />
        </Suspense>

        {/* Main content area where nested routes (pages) will render */}
        <main className="grow bg-white dark:bg-gray-900 text-gray-100 transition-colors duration-200">
          <Outlet />
        </main>

        <Suspense fallback={<Preloader />}>
          {/* Lazy loaded Footer */}
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default RootLayout;
