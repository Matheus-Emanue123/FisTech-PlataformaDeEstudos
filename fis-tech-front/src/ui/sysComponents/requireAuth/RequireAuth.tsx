import React, { ReactNode, useContext } from "react";
import UseAuthContext from "../../../utils/hooks/useAuth/UseAuthContext";
import { LoginPage } from "../../sysPages/loginPage/LoginPage";
import { UserType } from "../../../modules/user/config/EnumUserType";
import { Typography } from "@mui/material";

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
  console.log("RequireAuth - user:", user);

  if (!user) {
    return <LoginPage />;
  }

  if (!hasPermission(level)) {
    return <Typography variant="h1">Permissão NEGADA!!!</Typography>;
  }

  return <> {children} </>;
};
