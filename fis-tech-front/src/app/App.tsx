import { UseAppController } from "./AppController";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { MaterialUiTheme } from "../ui/sysMaterialUi/theme";
import { appStyles } from "./AppStyles";
import UseAuthController from "../utils/hooks/useAuth/UseAuthController";

export const App = () => {
  return (
    <ThemeProvider theme={MaterialUiTheme}>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={appStyles} />
      <UseAuthController>
        <UseAppController />
      </UseAuthController>
    </ThemeProvider>
  );
};
