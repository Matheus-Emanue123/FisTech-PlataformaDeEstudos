import React, { useState } from "react";
import { Box, Icon } from "@mui/material";
import Styles from "./AppHeaderStyles";
import { sysAppHeaderOptions } from "../appModuleManeger/AppModuleManeger";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { SysSvg } from "../../sysComponents/SysSvg/SysSvg";
import { HeaderSvgs } from "../../../utils/svg/headerSvgs";

interface IAppHeader {}

export const AppHeader: React.FC<IAppHeader> = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();

  return (
    <Styles.HeaderContainer isExpanded={isExpanded}>
      <Styles.LogoContainer>
        {isExpanded && (
          <Box component="img" src="/assets/svgs/logo.svg" alt="FisTech Logo" />
        )}
        <Box
          sx={{
            color: theme.palette.common.white,
            cursor: "pointer",
          }}
        >
          {isExpanded ? (
            <KeyboardArrowLeftOutlinedIcon
              onClick={() => setIsExpanded(!isExpanded)}
            />
          ) : (
            <KeyboardArrowRightOutlinedIcon
              onClick={() => setIsExpanded(!isExpanded)}
            />
          )}
        </Box>
      </Styles.LogoContainer>

      <Styles.MenuContainer>
        {sysAppHeaderOptions.map((item, index) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Styles.MenuItem
              key={`appHeaderOption${index}`}
              onClick={() => navigate(item.path)}
              isCollapsed={!isExpanded}
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
                  {item.label}
                </Styles.MenuText>
              )}
            </Styles.MenuItem>
          );
        })}
      </Styles.MenuContainer>
      <Styles.LogoutContainer onClick={() => console.log("Clicou no Logout")}>
        <Styles.LogoutIconCircle>
          <SysSvg paths={HeaderSvgs["userLogoutOutlined"]} />
        </Styles.LogoutIconCircle>
      </Styles.LogoutContainer>
    </Styles.HeaderContainer>
  );
};
