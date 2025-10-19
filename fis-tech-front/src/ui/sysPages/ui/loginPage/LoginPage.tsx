import React, { useContext, useState } from "react";
import Styles from "./LoginPageStyles";
import StylesApp from "../../../layout/appLayout/AppLayoutStyles";
import { SysTextField } from "../../../sysComponents/sysForm/sysTextField/SysTextField";
import UseAuthContext from "../../../../utils/hooks/useAuth/UseAuthContext";
import UseAppContext from "../../../../app/AppContext";
import { Box } from "@mui/material";
import { SysButton } from "../../../sysComponents/sysForm/sysButton/SysButton";
import sysSizing from "../../../sysMaterialUi/sizing/sysSizes";

interface ILoginPageProps {}

type ILoginForm = {
  email: string;
  password: string;
};

export const LoginPage: React.FC<ILoginPageProps> = () => {
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    email: "",
    password: "",
  });

  const { signIn } = useContext(UseAuthContext);
  const { showLoading, showNotification } = useContext(UseAppContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    if (!!loginForm.email && !!loginForm.password) {
      showLoading(true);
      await signIn(
        loginForm.email,
        loginForm.password,
        (erro: any, resp: boolean) => {
          if (erro) {
            showNotification({
              open: true,
              type: "error",
              message: erro,
            });
          } else if (resp) {
            showNotification({
              open: true,
              type: "success",
              message: "Login efetuado com sucesso",
            });
          }
        }
      );
      showLoading(false);
    }
  };

  return (
    <StylesApp.AppScreen>
      <StylesApp.AppBody>
        <StylesApp.AppContainerRouterSwitch id={"routerSwitchLogin"}>
          <Styles.PageContainer>
            <Styles.LeftSide />
            <Styles.RightSide>
              <Styles.Logo
                src="/assets/svgs/logoEscura.svg"
                alt="Logo Fistech"
              />
              <Styles.WelcomeHeader variant="h2">
                Boas-vindas ao FisTech!
              </Styles.WelcomeHeader>
              <Styles.LoginFormContainer>
                <Styles.Subtitle variant="body1">
                  Novo usuário? <Box component="span">Cadastre-se</Box>
                </Styles.Subtitle>
                <form>
                  <SysTextField
                    sx={{ container: { paddingLeft: 0 } }}
                    label="Email"
                    name="email"
                    placeholder="Digite seu e-mail de acesso"
                    fullWidth
                    value={loginForm.email}
                    changeValue={handleChange}
                  />
                  <SysTextField
                    sx={{ container: { paddingTop: 0, paddingLeft: 0 } }}
                    label="Senha"
                    name="password"
                    placeholder="Digite sua senha de acesso"
                    fullWidth
                    type="password"
                    value={loginForm.password}
                    changeValue={handleChange}
                  />
                  <SysButton
                    loadingPosition="start"
                    sx={{
                      width: `calc(100% -  ${sysSizing.base.baseFixed075})`,
                      backgroundColor: (theme) => theme.palette.secondary.main,
                      ":hover": {
                        backgroundColor: (theme) =>
                          theme.palette.secondary.dark,
                      },
                    }}
                    mode="primary"
                    label="Entrar"
                    type="button"
                    onClick={handleLogin}
                  />
                </form>
              </Styles.LoginFormContainer>
              <Styles.CallToAction variant="h4">
                Pratique, evolua e entenda a Física de verdade
              </Styles.CallToAction>
            </Styles.RightSide>
          </Styles.PageContainer>
        </StylesApp.AppContainerRouterSwitch>
      </StylesApp.AppBody>
    </StylesApp.AppScreen>
  );
};
