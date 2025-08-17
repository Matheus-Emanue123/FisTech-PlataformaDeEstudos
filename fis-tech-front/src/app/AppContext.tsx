import { createContext } from "react";
import { IShowNotificationProps } from "../ui/layout/appNotificationStack/components/showNotification/ShowNotification";

interface IAppContext {
  showNotification: (options: Omit<IShowNotificationProps, "position">) => void;
  showLoading: (status: boolean) => void;
  isMobile: boolean;
}

const UseAppContext = createContext<IAppContext>({} as IAppContext);

export default UseAppContext;

export type { IAppContext };
