import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

import Preloader from "../components/Preloader";
const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));

const RootLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <Suspense fallback={<Preloader />}>
          {/* Lazy loaded Header */}
          <Header />
        </Suspense>
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
