// Import necessary React and router utilities
import { lazy } from "react";
import { Route, createRoutesFromElements } from "react-router-dom";

// Import custom route wrapper and preloader component
import RouteWithAnimation from "../utils/RouteWithAnimation";
import Preloader from "../components/Preloader";

import DashboardNotFound from "../pages/Dashboard/DashboardNotFound";

// Lazy load all components to improve performance
const RootLayout = lazy(() => import("../layout/RootLayout"));
const DashboardLayout = lazy(() => import("../layout/DashboardLayout"));

const Home = lazy(() => import("../pages/Home"));
const Campaigns = lazy(() => import("../pages/Campaigns"));
const CampaignDetails = lazy(() => import("../pages/CampaignDetails"));
const Donate = lazy(() => import("../pages/Donate"));
const SignUp = lazy(() => import("../pages/Auth/SignUp"));
const SignIn = lazy(() => import("../pages/Auth/SignIn"));

const CreatorDashboard = lazy(() =>
  import("../pages/Dashboard/Creator/CreatorDashboard")
);
const CreateCampaign = lazy(() =>
  import("../pages/Dashboard/Creator/CreateCampaign")
);
const MyCampaigns = lazy(() =>
  import("../pages/Dashboard/Creator/MyCampaigns")
);

const AdminDashboard = lazy(() =>
  import("../pages/Dashboard/Admin/AdminDashboard")
);
const AdminCampaignList = lazy(() =>
  import("../pages/Dashboard/Admin/AdminCampaignList")
);

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

      {/* Page not found */}
      <Route
        path="*"
        element={
          <RouteWithAnimation
            Component={DashboardNotFound}
            Fallback={Preloader}
          />
        }
      />
    </Route>

    {/* Campaign Creator Routes */}
    <Route>
      <Route path="/creator/dashboard" element={<DashboardLayout />}>
        <Route
          index
          element={
            <RouteWithAnimation
              Component={CreatorDashboard}
              Fallback={Preloader}
            />
          }
        />
        <Route
          path="my-campaigns"
          element={
            <RouteWithAnimation Component={MyCampaigns} Fallback={Preloader} />
          }
        />
        <Route
          path="create-campaign"
          element={
            <RouteWithAnimation
              Component={CreateCampaign}
              Fallback={Preloader}
            />
          }
        />
        <Route
          path="*"
          element={
            <RouteWithAnimation
              Component={DashboardNotFound}
              Fallback={Preloader}
            />
          }
        />
      </Route>
    </Route>

    {/* Admin Routes */}
    <Route>
      <Route
        path="/admin/dashboard"
        element={<DashboardLayout />}
        // errorElement={<ErrorFallback />}
      >
        <Route
          index
          element={
            <RouteWithAnimation
              Component={AdminDashboard}
              Fallback={Preloader}
            />
          }
        />
        <Route
          path="all-campaigns"
          element={
            <RouteWithAnimation
              Component={AdminCampaignList}
              Fallback={Preloader}
            />
          }
        />

        <Route
          path="*"
          element={
            <RouteWithAnimation
              Component={DashboardNotFound}
              Fallback={Preloader}
            />
          }
        />
      </Route>
    </Route>
  </>
);
