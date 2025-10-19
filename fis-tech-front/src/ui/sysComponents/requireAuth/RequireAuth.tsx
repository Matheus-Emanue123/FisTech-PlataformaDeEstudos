import React, { ReactNode, useContext } from "react";
import UseAuthContext from "../../../utils/hooks/useAuth/UseAuthContext";
import { UserType } from "../../../modules/usuario/config/EnumUserType";
import { useNavigate } from "react-router-dom";

interface IRequireAuthProps {
  level?: UserType;
  children: ReactNode;
}

export const RequireAuth: React.FC<IRequireAuthProps> = ({
  children,
  level = UserType.NORMAL,
}) => {
  const { hasPermission } = useContext(UseAuthContext);
  const navigate = useNavigate();

  if (!hasPermission(level)) {
    navigate("/not-permission");
  }

  return <> {children} </>;
};
