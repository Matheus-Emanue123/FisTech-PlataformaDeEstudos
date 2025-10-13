// LoginPage.tsx

import React, { useContext, useState } from "react";
import Styles from "./LoginPageStyles";
import { SysTextField } from "../../sysComponents/sysForm/sysTextField/SysTextField";
import { SysButton } from "../../sysComponents/sysForm/sysButton/SysButton";
import UseAuthContext from "../../../utils/hooks/useAuth/UseAuthContext";
import { Link } from "@mui/material";

type ILoginForm = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    email: "",
    password: "",
  });

  const { signIn } = useContext(UseAuthContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    if (loginForm.email && loginForm.password) {
      const isLogged = await signIn(loginForm.email, loginForm.password);
      if (!isLogged) {
        alert("Não foi possível realizar login!");
      }
    }
  };

  return (
    <Styles.PageContainer>
      <Styles.LeftSide />
      <Styles.RightSide>
        <Styles.LoginFormContainer>
          <Styles.Logo
            src="/assets/svgs/logoHorizontal.svg"
            alt="Logo Fistech"
          />

          <Styles.WelcomeHeader>Boas Vindas ao FisTech!</Styles.WelcomeHeader>

          <Styles.Subtitle>
            Novo Usuário?{" "}
            <Link href="/register" underline="none" color="primary">
              Crie sua conta!
            </Link>
          </Styles.Subtitle>

          <form>
            <SysTextField
              sx={{ backgroundColor: "white", marginBottom: "0"}}
              label="Email"
              name="email"
              placeholder="Digite seu e-mail de acesso"
              fullWidth
              value={loginForm.email}
              changeValue={handleChange}
            />
            <SysTextField
              sx={{ backgroundColor: "white" }}
              label="Senha"
              name="password"
              placeholder="Digite sua senha de acesso"
              fullWidth
              type="password"
              value={loginForm.password}
              changeValue={handleChange}
            />
          </form>

          <SysButton
            sx={{
              marginTop: "24px",
              backgroundColor: (theme) => theme.palette.secondary.main,
              ":hover": {
                backgroundColor: (theme) => theme.palette.secondary.dark,
              },
            }}
            fullWidth
            mode="primary"
            label="Entrar"
            type="button"
            onClick={handleLogin}
          />

          <Styles.CallToAction>
            Pratique, evolua e entenda a Física de verdade.
          </Styles.CallToAction>
        </Styles.LoginFormContainer>
      </Styles.RightSide>
    </Styles.PageContainer>
  );
};