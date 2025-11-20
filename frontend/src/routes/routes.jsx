// Import necessary React and router utilities
import { lazy } from "react";
import { Route, createRoutesFromElements } from "react-router-dom";

// Import components
import RouteWithAnimation from "../utils/RouteWithAnimation";
import Preloader from "../components/Preloader";
import ErrorFallback from "../components/ErrorFallback";
import ProtectedRoute from "../components/ProtectedRoute";

// Lazy load all components to improve performance
const RootLayout = lazy(() => import("../layout/RootLayout"));
const DashboardLayout = lazy(() => import("../layout/DashboardLayout"));

const Home = lazy(() => import("../pages/Home"));
const Campaigns = lazy(() => import("../pages/Campaigns"));
const CampaignDetails = lazy(() => import("../pages/CampaignDetails"));
const Donate = lazy(() => import("../pages/Donate"));
const SignUp = lazy(() => import("../pages/Auth/SignUp"));
const SignIn = lazy(() => import("../pages/Auth/SignIn"));
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const NotFound = lazy(() => import("../pages/NotFound"));
const DonationResult = lazy(() => import("../pages/DonationResult"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"))

const CreatorDashboard = lazy(() =>
  import("../pages/Dashboard/Creator/CreatorDashboard")
);
const CreateCampaign = lazy(() =>
  import("../pages/Dashboard/Creator/CreateCampaign")
);
const EditCampaign = lazy(() =>
  import("../pages/Dashboard/Creator/EditCampaign")
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
        path="donate/:id"
        element={<RouteWithAnimation Component={Donate} Fallback={Preloader} />}
      />

      {/* Donation Result page */}
      <Route
        path="donation-result"
        element={
          <RouteWithAnimation Component={DonationResult} Fallback={Preloader} />
        }
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

      {/* Verify email page */}
      <Route
        path="/verify-email"
        element={
          <RouteWithAnimation Component={VerifyEmail} Fallback={Preloader} />
        }
      />
      {/* Unauthorized page */}
      <Route
        path="/unauthorized"
        element={
          <RouteWithAnimation Component={Unauthorized} Fallback={Preloader} />
        }
      />

      {/* Page not found */}
      <Route
        path="*"
        element={
          <RouteWithAnimation Component={NotFound} Fallback={Preloader} />
        }
      />
    </Route>

    {/* Campaign Creator Routes */}
    <Route element={<ProtectedRoute allowedRoles={["creator"]} />}>
      <Route
        path="/creator"
        element={<DashboardLayout />}
        errorElement={<ErrorFallback />}
      >
        <Route
          path="home"
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
          path="edit/:id"
          element={
            <RouteWithAnimation
              Component={EditCampaign}
              Fallback={Preloader}
            />
          }
        />
        <Route
          path="*"
          element={
            <RouteWithAnimation Component={NotFound} Fallback={Preloader} />
          }
        />
      </Route>
    </Route>

    {/* Admin Routes */}
    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
      <Route
        path="/admin"
        element={<DashboardLayout />}
        errorElement={<ErrorFallback />}
      >
        <Route
          path="home"
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
            <RouteWithAnimation Component={NotFound} Fallback={Preloader} />
          }
        />
      </Route>
    </Route>
  </>
);
