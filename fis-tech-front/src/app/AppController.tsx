import React, { useCallback, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { AppLayout } from "../ui/layout/appLayout/AppLayout";
import Context, { IAppContext } from "./AppContext";
import {
  AppNotificationStack,
  IAppNotification,
} from "../ui/layout/appNotificationStack/AppNotificationStack";
import { MAX_NOTIFICATIONS } from "../typings/ConfigEnvironment";
import { AppLoading } from "../ui/layout/appLoading/AppLoaging";

export const UseAppController: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [notifications, setNotifications] = useState<IAppNotification[]>([]);
  const [loadingSystem, setLoadingSystem] = useState<boolean>(false);

  const addNotification = useCallback((notif: Omit<IAppNotification, "id">) => {
    const next = { ...notif, id: crypto.randomUUID() };

    setNotifications((prev) => {
      const oldNotifications =
        prev.length >= Number(MAX_NOTIFICATIONS || 0)
          ? prev.slice(0, Number(MAX_NOTIFICATIONS) - 1)
          : prev;
      return [next, ...oldNotifications];
    });
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const providerValue: IAppContext = {
    showNotification: addNotification,
    showLoading: setLoadingSystem,
    isMobile: isMobile,
  };

  return (
    <Context.Provider value={providerValue}>
      {loadingSystem && <AppLoading />}
      <AppLayout />
      <AppNotificationStack
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </Context.Provider>
  );
};

export default UseAppController;
