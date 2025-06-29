import { Routes, Route, Navigate } from "react-router-dom";
import { Example } from "../ui/sysPages/example/Example";
import { Box, Typography } from "@mui/material";
import { RequireAuth } from "../ui/sysComponents/requireAuth/RequireAuth";
import { useContext } from "react";
import UseAuthContext from "../utils/hooks/useAuth/UseAuthContext";
import { SysButton } from "../ui/sysComponents/sysForm/sysButton/SysButton";

export const AppRouterSwitch = () => {
  const { isLogged } = useContext(UseAuthContext);
  return (
    <Routes>
      <Route path="/example" element={<Example />} />
      <Route
        path="/atividades/:screenState?/:id?"
        element={
          <Box>
            <Typography>Atividades</Typography>
          </Box>
        }
      />
      <Route
        path="/cursos/:screenState?/:id?"
        element={
          <Box>
            <Typography>cursos</Typography>
          </Box>
        }
      />
      <Route
        path="/usuarios/:screenState?/:id?"
        element={
          <RequireAuth path="/usuarios">
            <Box>
              <Typography>usuarios</Typography>
            </Box>
            {isLogged && (
              <SysButton mode="primary" label="Sair" onClick={() => {}} />
            )}
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/example" />} />
    </Routes>
  );
};
