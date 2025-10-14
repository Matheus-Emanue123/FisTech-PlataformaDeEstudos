/* eslint-disable */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { AppLayout } from "../ui/layout/appLayout/AppLayout";
import Context, { IAppContext } from "./AppContext";
import {
  AppNotificationStack,
  IAppNotification,
} from "../ui/layout/appNotificationStack/AppNotificationStack";
import { MAX_NOTIFICATIONS } from "../typings/ConfigEnvironment";
import { AppLoading } from "../ui/layout/appLoading/AppLoading";
import { ISysGeneralComponentsCommon } from "../typings/DefaultTypings";
import {
  IShowDialogProps,
  ShowDialog,
} from "../ui/sysComponents/showDialog/ShowDialog";
import UseAuthContext from "../utils/hooks/useAuth/UseAuthContext";
import { LoginPage } from "../ui/sysPages/loginPage/LoginPage";

const defaultState: ISysGeneralComponentsCommon = { open: false };

export const UseAppController: React.FC = () => {
  const theme = useTheme();
  const { user, checkToken } = useContext(UseAuthContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { isLogged, signOut } = useContext(UseAuthContext);

  const [notifications, setNotifications] = useState<IAppNotification[]>([]);
  const [loadingSystem, setLoadingSystem] = useState<boolean>(
    !!localStorage.getItem("authToken")
  );
  const [showDialog, setShowDialog] = useState<IShowDialogProps>(defaultState);

  useEffect(() => {
    const verifyUser = async () => {
      await checkToken();
      setLoadingSystem(false);
    };
    verifyUser();
  }, []);

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

  const showDialogHandler = useCallback((props?: IShowDialogProps) => {
    props?.onOpen?.();
    setShowDialog({
      ...showDialog,
      ...props,
      close: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") =>
        handleCloseDialog(event, reason, props?.onClose),
      open: true,
    });
  }, []);

  const handleCloseDialog = useCallback(
    (
      event?: {},
      reason?: "backdropClick" | "escapeKeyDown",
      callBack?: (
        event?: {},
        reason?: "backdropClick" | "escapeKeyDown"
      ) => void
    ) => {
      setShowDialog(defaultState);
      callBack?.(event, reason);
    },
    []
  );

  const providerValue: IAppContext = {
    showNotification: addNotification,
    showLoading: setLoadingSystem,
    showDialog: showDialogHandler,
    closeDialog: handleCloseDialog,
    isMobile: isMobile,
  };

  return (
    <Context.Provider value={providerValue}>
      {loadingSystem && <AppLoading />}
      {!user ? <LoginPage /> : <AppLayout />}
      <AppNotificationStack
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <ShowDialog {...showDialog} />
    </Context.Provider>
  );
};

export default UseAppController;
