import React, { ReactNode, useContext } from "react";
import UseAuthContext from "../../../utils/hooks/useAuth/UseAuthContext";
import { LoginPage } from "../../sysPages/loginPage/LoginPage";

interface IRequireAuthProps {
  path: string;
  children: ReactNode;
}

export const RequireAuth: React.FC<IRequireAuthProps> = ({
  children,
  path,
}) => {
  const { user } = useContext(UseAuthContext);

  if (!user) {
    return <LoginPage redirectionPath={path} />;
  }

  return <> {children} </>;
};
