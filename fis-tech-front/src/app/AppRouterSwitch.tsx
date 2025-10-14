import { Routes, Route } from "react-router-dom";
import { Example } from "../ui/sysPages/example/Example";
import { Box, Typography } from "@mui/material";
import { RequireAuth } from "../ui/sysComponents/requireAuth/RequireAuth";

import { UserType } from "../modules/usuario/config/EnumUserType";
import { NotFoundPage } from "../ui/sysPages/notFoundPage/NotFoundPage";

export const AppRouterSwitch = () => {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route
        path="/atividades/:screenState?/:id?"
        element={
          <Box>
            <Typography>Atividades</Typography>
          </Box>
        }
      />
      <Route
        path="/usuarios/:screenState?/:id?"
        element={
          <RequireAuth level={UserType.ADMINISTRATOR}>
            <Box>
              <Typography>Usuarios</Typography>
            </Box>
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
