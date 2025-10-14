import { Routes, Route, useNavigate } from "react-router-dom";
import { Example } from "../ui/sysPages/example/Example";
import { Box, Typography } from "@mui/material";
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
          <Box>
            <Typography>Usuários</Typography>
          </Box>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
