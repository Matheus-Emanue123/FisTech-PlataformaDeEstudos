import React, { useState } from "react";
import { Box } from "@mui/material";
import Styles from "./AppSideHeaderStyles";

interface IAppSideHeader {}

export const AppSideHeader: React.FC<IAppSideHeader> = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleHomeClick = () => {
    console.log("Clicou em Home");
    
  };

  const handleStatisticsClick = () => {
    console.log("Clicou em Estatísticas");
  
  };

  const handleConquestsClick = () => {
    console.log("Clicou em Conquistas");
    
  };

  const handleActivitiesClick = () => {
    console.log("Clicou em Atividades");
    
  };

  const handleLanguageClick = () => {
    console.log("Clicou em Idioma");
    
  };

  const handleSettingsClick = () => {
    console.log("Clicou em Configurações");
   
  };

  const handleLogoutClick = () => {
    console.log("Clicou em Logout");

  };
  return (
    <Styles.SideHeaderContainer isExpanded={isExpanded}>
      <Styles.LogoContainer>
        {isExpanded && (
          <Box
            component="img"
            src="/assets/imgs/icons/sidebar/logo.svg"
            alt="FisTech Logo"
            sx={{
              height: "auto",
              width: "100%",
              maxWidth: "120px",
            }}
          />
        )}
        
        {/* Botão de Toggle */}
        <Box
          onClick={handleToggleSidebar}
          sx={{
            position: "absolute",
            top: "24px",
            right: isExpanded ? "16px" : "50%",
            transform: isExpanded ? "none" : "translateX(50%)",
            cursor: "pointer",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <Box
            component="img"
            src={`/assets/imgs/icons/sidebar/${isExpanded ? 'collapse' : 'expand'}.svg`}
            alt={isExpanded ? 'Colapsar' : 'Expandir'}
            sx={{
              width: "16px",
              height: "16px",
              filter: "brightness(0) invert(1) opacity(0.7)",
            }}
          />
        </Box>
      </Styles.LogoContainer>
      
      {/* Menu Items */}
      <Styles.MenuContainer>
        {/* Home - Item ativo */}
        <Styles.MenuItem onClick={handleHomeClick} isCollapsed={!isExpanded}>
          <Styles.MenuIcon isCollapsed={!isExpanded}>
            <Box
              component="img"
              src="/assets/imgs/icons/sidebar/home.svg"
              alt="Home"
              sx={{
                width: "20px",
                height: "20px",
                filter: "brightness(0) invert(1)", 
              }}
            />
          </Styles.MenuIcon>
          {isExpanded && (
            <Styles.MenuText sx={{ color: "rgba(255, 255, 255, 1)" }}>
              Home
            </Styles.MenuText>
          )}
        </Styles.MenuItem>

        {/* Estatísticas */}
        <Styles.MenuItem onClick={handleStatisticsClick} isCollapsed={!isExpanded}>
          <Styles.MenuIcon isCollapsed={!isExpanded}>
            <Box
              component="img"
              src="/assets/imgs/icons/sidebar/statistics.svg"
              alt="Estatísticas"
              sx={{
                width: "20px",
                height: "20px",
                filter: "brightness(0) invert(1) opacity(0.5)",
              }}
            />
          </Styles.MenuIcon>
          {isExpanded && (
            <Styles.MenuText>Estatísticas</Styles.MenuText>
          )}
        </Styles.MenuItem>

        {/* Conquistas */}
        <Styles.MenuItem onClick={handleConquestsClick} isCollapsed={!isExpanded}>
          <Styles.MenuIcon isCollapsed={!isExpanded}>
            <Box
              component="img"
              src="/assets/imgs/icons/sidebar/rank.svg"
              alt="Conquistas"
              sx={{
                width: "20px",
                height: "20px",
                filter: "brightness(0) invert(1) opacity(0.5)", 
              }}
            />
          </Styles.MenuIcon>
          {isExpanded && (
            <Styles.MenuText>Conquistas</Styles.MenuText>
          )}
        </Styles.MenuItem>

        {/* Atividades */}
        <Styles.MenuItem onClick={handleActivitiesClick} isCollapsed={!isExpanded}>
          <Styles.MenuIcon isCollapsed={!isExpanded}>
            <Box
              component="img"
              src="/assets/imgs/icons/sidebar/activities.svg"
              alt="Atividades"
              sx={{
                width: "20px",
                height: "20px",
                filter: "brightness(0) invert(1) opacity(0.5)",
              }}
            />
          </Styles.MenuIcon>
          {isExpanded && (
            <Styles.MenuText>Atividades</Styles.MenuText>
          )}
        </Styles.MenuItem>

        {/* Idioma */}
        <Styles.MenuItem onClick={handleLanguageClick} isCollapsed={!isExpanded}>
          <Styles.MenuIcon isCollapsed={!isExpanded}>
            <Box
              component="img"
              src="/assets/imgs/icons/sidebar/world.svg"
              alt="Idioma"
              sx={{
                width: "20px",
                height: "20px",
                filter: "brightness(0) invert(1) opacity(0.5)", 
              }}
            />
          </Styles.MenuIcon>
          {isExpanded && (
            <Styles.MenuText>Idioma</Styles.MenuText>
          )}
        </Styles.MenuItem>

        {/* Configurações */}
        <Styles.MenuItem onClick={handleSettingsClick} isCollapsed={!isExpanded}>
          <Styles.MenuIcon isCollapsed={!isExpanded}>
            <Box
              component="img"
              src="/assets/imgs/icons/sidebar/settings.svg"
              alt="Configurações"
              sx={{
                width: "20px",
                height: "20px",
                filter: "brightness(0) invert(1) opacity(0.5)", 
              }}
            />
          </Styles.MenuIcon>
          {isExpanded && (
            <Styles.MenuText>Configurações</Styles.MenuText>
          )}
        </Styles.MenuItem>
      </Styles.MenuContainer>

      {/* Área de Logout */}
      <Styles.LogoutContainer onClick={handleLogoutClick}>
        <Styles.LogoutIconCircle>
          <Box
            component="img"
            src="/assets/imgs/icons/sidebar/user-logout.svg"
            alt="Logout"
            sx={{
              width: "20px", // Tamanho do ícone - mesmo dos outros menus
              height: "20px",
              filter: "brightness(0) invert(1) opacity(0.7)", // Branco 70%
            }}
          />
        </Styles.LogoutIconCircle>
      </Styles.LogoutContainer>
    </Styles.SideHeaderContainer>
  );
};