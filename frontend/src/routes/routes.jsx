import { lazy } from "react";
import { Route, createRoutesFromElements } from "react-router-dom";

import RouteWithAnimation from "../utils/RouteWithAnimation";
import Preloader from "../components/Preloader";

const RootLayout = lazy(() => import("../layout/RootLayout"));

const Home = lazy(() => import("../pages/Home"));
const Campaigns = lazy(() => import("../pages/Campaigns"));
const CampaignDetails = lazy(() => import("../pages/CampaignDetails"));
const Donate = lazy(() => import("../pages/Donate"));
const SignUp = lazy(() => import("../pages/Auth/SignUp"));
const SignIn = lazy(() => import("../pages/Auth/SignIn"));

export const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={<RouteWithAnimation Component={Home} Fallback={Preloader} />}
      />
      <Route
        path="campaigns"
        element={
          <RouteWithAnimation Component={Campaigns} Fallback={Preloader} />
        }
      />
      <Route
        path="campaign/1"
        element={
          <RouteWithAnimation
            Component={CampaignDetails}
            Fallback={Preloader}
          />
        }
      />
      <Route
        path="signup"
        element={<RouteWithAnimation Component={SignUp} Fallback={Preloader} />}
      />
      <Route
        path="signin"
        element={<RouteWithAnimation Component={SignIn} Fallback={Preloader} />}
      />
    </Route>
  </>
);
