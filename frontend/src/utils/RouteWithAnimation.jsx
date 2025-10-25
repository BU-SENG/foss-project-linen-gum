import { Suspense } from "react";

const RouteWithAnimation = ({ Component, Fallback }) => {
  return (
    <Suspense fallback={<Fallback />}>
      <Component />
    </Suspense>
  );
};

export default RouteWithAnimation;
