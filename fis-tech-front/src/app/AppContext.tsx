import { createContext } from "react";
import { IShowNotificationProps } from "../ui/layout/appNotificationStack/components/showNotification/ShowNotification";
import { IShowDialogProps } from "../ui/sysComponents/showDialog/ShowDialog";
import { PageState } from "../typings/ScreenTypes";

interface IAppContext {
  isMobile: boolean;
  showNotification: (options: Omit<IShowNotificationProps, "position">) => void;
  showLoading: (status: boolean) => void;
  showDialog: (options?: IShowDialogProps) => void;
  closeDialog: (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown",
    callBack?: (
      event?: object,
      reason?: "backdropClick" | "escapeKeyDown"
    ) => void
  ) => void;
  openUsuarioDetail: (
    callReload: () => void,
    state?: PageState,
    id?: string
  ) => void;
}

const UseAppContext = createContext<IAppContext>({} as IAppContext);

export default UseAppContext;

export type { IAppContext };
