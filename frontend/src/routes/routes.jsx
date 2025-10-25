import { lazy } from "react";
import { Route, createRoutesFromElements } from "react-router-dom";

import RouteWithAnimation from "../utils/RouteWithAnimation";
import Preloader from "../components/Preloader";

const RootLayout = lazy(() => import("../layout/RootLayout"));

const Home = lazy(() => import("../pages/Home"));
const Campaigns = lazy(() => import("../pages/Campaigns"));

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
    </Route>
  </>
);
