import React, { useLocation, Navigate, Outlet } from "react-router-dom";
import { ROUTE_PREFIX } from "../../constants";
import useDeck from "../../hooks/useDeck";

const RequireMode = () => {
  const { currentDeck } = useDeck();
  const location = useLocation();

  return currentDeck ? (
    <Outlet />
  ) : (
    <Navigate to={`${ROUTE_PREFIX}/main`} state={{ from: location }} replace />
  );
};

export default RequireMode;
