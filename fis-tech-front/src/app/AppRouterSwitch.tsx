import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { RequireAuth } from "../ui/sysComponents/requireAuth/RequireAuth";
import sysRoutes from "../ui/layout/appModuleManeger/SysRoutes";
import { IRoute } from "../typings/ModulesTypings";

const renderElement = (route: IRoute): React.ReactElement => {
  const inner = React.isValidElement(route.component)
    ? route.component
    : React.createElement(route.component as React.ComponentType<any>);

  return inner;
};

export const AppRouterSwitch = () => {
  const location = useLocation();

  return (
    <Routes>
      {sysRoutes.getRoutes().map((route: IRoute) => {
        const element = route.permissionRequired ? (
          <RequireAuth level={route.level}>{renderElement(route)}</RequireAuth>
        ) : (
          renderElement(route)
        );

        return <Route key={route.path} path={route.path} element={element} />;
      })}
      {!sysRoutes.checkIfRouteExists(location.pathname) && (
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      )}
    </Routes>
  );
};
