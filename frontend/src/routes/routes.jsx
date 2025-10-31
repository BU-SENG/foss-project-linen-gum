// Import necessary React and router utilities
import { lazy } from "react";
import { Route, createRoutesFromElements } from "react-router-dom";

// Import custom route wrapper and preloader component
import RouteWithAnimation from "../utils/RouteWithAnimation";
import Preloader from "../components/Preloader";

// Lazy load all components to improve performance
const RootLayout = lazy(() => import("../layout/RootLayout"));

const Home = lazy(() => import("../pages/Home"));
const Campaigns = lazy(() => import("../pages/Campaigns"));
const CampaignDetails = lazy(() => import("../pages/CampaignDetails"));
const Donate = lazy(() => import("../pages/Donate"));
const SignUp = lazy(() => import("../pages/Auth/SignUp"));
const SignIn = lazy(() => import("../pages/Auth/SignIn"));

// Define all application routes
export const routes = createRoutesFromElements(
  <>
    {/* Root route - wraps all pages inside RootLayout */}
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={<RouteWithAnimation Component={Home} Fallback={Preloader} />}
      />
      {/* Campaigns listing page */}
      <Route
        path="campaigns"
        element={
          <RouteWithAnimation Component={Campaigns} Fallback={Preloader} />
        }
      />

      {/* Campaign details page */}
      <Route
        path="campaign/:id"
        element={
          <RouteWithAnimation
            Component={CampaignDetails}
            Fallback={Preloader}
          />
        }
      />

      {/* Donate page */}
      <Route
        path="donate"
        element={<RouteWithAnimation Component={Donate} Fallback={Preloader} />}
      />

      {/* Sign-up page */}
      <Route
        path="signup"
        element={<RouteWithAnimation Component={SignUp} Fallback={Preloader} />}
      />

      {/* Sign-in page */}
      <Route
        path="signin"
        element={<RouteWithAnimation Component={SignIn} Fallback={Preloader} />}
      />
    </Route>
  </>
);
