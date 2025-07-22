import React, { useCallback, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { AppLayoutRefatorado } from "../ui/layout/appLayout/AppLayoutRefatorado";
import Context, { IAppContext } from "./AppContext";
import { IShowNotificationProps } from "../ui/layout/appNotificationStack/components/showNotification/ShowNotification";
import { AppNotificationStack } from "../ui/layout/appNotificationStack/AppNotificationStack";

export const UseAppController: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [listShowNotifications, setListShowNotifications] = useState<
    Omit<IShowNotificationProps, "position">[]
  >([]);

  console.log("listShowNotifications = ", listShowNotifications);

  const addShowNotification = useCallback(
    (options: Omit<IShowNotificationProps, "position">) => {
      setListShowNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications, options];
        if (updatedNotifications.length > 4) {
          updatedNotifications.shift();
        }

        return updatedNotifications;
      });
    },
    []
  );

  const providerValue: IAppContext = {
    showNotification: addShowNotification,
    isMobile: isMobile,
  };

  return (
    <Context.Provider value={providerValue}>
      <AppLayoutRefatorado />
      <AppNotificationStack
        listShowNotifications={listShowNotifications}
        setListShowNotifications={setListShowNotifications}
      />
    </Context.Provider>
  );
};

export default UseAppController;
