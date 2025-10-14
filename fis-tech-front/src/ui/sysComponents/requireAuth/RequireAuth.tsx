import React, { ReactNode, useContext } from "react";
import UseAuthContext from "../../../utils/hooks/useAuth/UseAuthContext";
import { UserType } from "../../../modules/usuario/config/EnumUserType";
import { NotPermissionPage } from "../../sysPages/notPermissionPage/NotPermissionPage";

interface IRequireAuthProps {
  level?: UserType;
  children: ReactNode;
}

export const RequireAuth: React.FC<IRequireAuthProps> = ({
  children,
  level = UserType.NORMAL,
}) => {
  const { hasPermission } = useContext(UseAuthContext);

  if (!hasPermission(level)) {
    return <NotPermissionPage />;
  }

  return <> {children} </>;
};
