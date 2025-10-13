import React, { ReactNode, useContext } from "react";
import UseAuthContext from "../../../utils/hooks/useAuth/UseAuthContext";
import { LoginPage } from "../../sysPages/loginPage/LoginPage";
import { UserType } from "../../../modules/user/config/EnumUserType";
import { Typography } from "@mui/material";
import { NotPermissionPage } from "../../sysPages/notPermissionPage/NotPermissionPage";

interface IRequireAuthProps {
  path: string;
  level?: UserType;
  children: ReactNode;
}

export const RequireAuth: React.FC<IRequireAuthProps> = ({
  children,
  path,
  level = UserType.NORMAL,
}) => {
  const { user, hasPermission } = useContext(UseAuthContext);

  if (!user) {
    return <LoginPage redirectionPath={path} />;
  }

  if (!hasPermission(level)) {
    return <NotPermissionPage />;
  }

  return <> {children} </>;
};
