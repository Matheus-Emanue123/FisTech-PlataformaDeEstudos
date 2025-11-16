import React, { useContext, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import Styles, { TooltipLogoutStyles } from "./AppHeaderStyles";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { SysSvg } from "../../sysComponents/SysSvg/SysSvg";
import { HeaderSvgs } from "../../../utils/svg/headerSvgs";
import UseAuthContext from "../../../utils/hooks/useAuth/UseAuthContext";
import sysRoutes from "../appModuleManeger/SysRoutes";
import { IAppMenu } from "../../../typings/ModulesTypings";
import { UserType } from "../../../modules/usuario/config/EnumUserType";
import UseAppContext from "../../../app/AppContext";

interface IAppHeader {}

export const AppHeader: React.FC<IAppHeader> = () => {
  const { user } = useContext(UseAuthContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  const { signOut } = useContext(UseAuthContext);
  const { showLoading } = useContext(UseAppContext);

  const handleSingOut = () => {
    showLoading(true);
    signOut();
    navigate("/");
    setTimeout(() => {
      showLoading(false);
    }, 1000);
  };

  return (
    <Styles.HeaderContainer isExpanded={isExpanded.toString()}>
      <Styles.LogoContainer>
        {isExpanded && (
          <Box component="img" src="/assets/svgs/logo.svg" alt="FisTech Logo" />
        )}
        <Box
          sx={{
            color: theme.palette.common.white,
            cursor: "pointer",
          }}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? (
            <KeyboardArrowLeftOutlinedIcon />
          ) : (
            <KeyboardArrowRightOutlinedIcon />
          )}
        </Box>
      </Styles.LogoContainer>

      <Styles.MenuContainer>
        {sysRoutes.getMenuItens().map((item: IAppMenu, index) => {
          const isActive = pathname.startsWith(item.path);
          if (
            item.permissionRequired &&
            user?.userType !== UserType.ADMINISTRATOR
          )
            return null;
          return (
            <Styles.MenuItem
              key={`appHeaderOption${index}`}
              onClick={() => navigate(item.path)}
              isCollapsed={(!isExpanded).toString()}
              sx={isActive ? { background: "#1d1d1d" } : {}}
            >
              <SysSvg
                paths={item.icon}
                sx={isActive ? { color: theme.palette.common.white } : {}}
              />
              {isExpanded && (
                <Styles.MenuText
                  sx={isActive ? { color: theme.palette.common.white } : {}}
                >
                  {item.name}
                </Styles.MenuText>
              )}
            </Styles.MenuItem>
          );
        })}
      </Styles.MenuContainer>

      <Styles.LogoutContainer>
        <Tooltip
          title="Sair"
          placement="bottom-start"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [10, -10],
                  },
                },
              ],
            },
            tooltip: { sx: TooltipLogoutStyles },
          }}
        >
          <Styles.LogoutIconCircle
            onClick={() => {
              handleSingOut();
            }}
          >
            <SysSvg paths={HeaderSvgs["userLogoutOutlined"]} />
          </Styles.LogoutIconCircle>
        </Tooltip>
      </Styles.LogoutContainer>
    </Styles.HeaderContainer>
  );
};
