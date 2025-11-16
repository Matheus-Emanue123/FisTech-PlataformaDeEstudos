import React, { useContext, useState } from "react";
import UsuarioDetailContext, {
  IUsuarioDetailContext,
} from "./usuarioDetailContext";
import Styles from "./usuarioDetailViewStyles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SysTextField } from "../../../../ui/sysComponents/sysForm/sysTextField/SysTextField";
import { SysButton } from "../../../../ui/sysComponents/sysForm/sysButton/SysButton";
import UseAppContext from "../../../../app/AppContext";
import UseAuthContext from "../../../../utils/hooks/useAuth/UseAuthContext";

type IUsuarioDetailForm = {
  nome: string;
  email: string;
  password: string;
};

const UsuarioDetailView: React.FC = () => {
  const context = useContext<IUsuarioDetailContext>(UsuarioDetailContext);
  const { register } = useContext(UseAuthContext);
  const { showLoading, showNotification, openUsuarioDetail, closeDialog } =
    useContext(UseAppContext);

  const [usuarioDetailForm, setUsuarioDetailForm] =
    useState<IUsuarioDetailForm>({
      nome: "",
      email: "",
      password: "",
    });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsuarioDetailForm({
      ...usuarioDetailForm,
      [event.target.name]: event.target.value,
    });
  };

  const isIncomplete = (): boolean => {
    const { nome, email, password } = usuarioDetailForm;
    const allFilled = nome.trim() && email.trim() && password.trim();
    return !allFilled;
  };

  const handleRegister = async () => {
    closeDialog();
    showLoading(true);
    await register(
      usuarioDetailForm.nome,
      usuarioDetailForm.email,
      usuarioDetailForm.password,
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
            message: "Usuário registrado com sucesso",
          });
        }
      }
    );
    showLoading(false);
  };

  return (
    <form>
      <Styles.informativeContainer>
        <Typography variant="h5">
          {context.pageType === "create"
            ? "Cadastrar "
            : context.pageType === "view"
            ? "Visualizar "
            : "Editar "}
          usuário
        </Typography>
        <IconButton onClick={() => context.closeModal()}>
          <CloseIcon name="close" />
        </IconButton>
      </Styles.informativeContainer>
      <Styles.formContainer>
        <SysTextField
          sx={{ container: { paddingTop: 0, paddingBottom: 0 } }}
          label="Nome"
          name="nome"
          placeholder="Digite seu nome"
          fullWidth
          type="nome"
          value={usuarioDetailForm.nome}
          changeValue={handleChange}
        />
        <SysTextField
          label="Email"
          name="email"
          placeholder="Digite seu e-mail de acesso"
          fullWidth
          value={usuarioDetailForm.email}
          changeValue={handleChange}
        />
        <SysTextField
          sx={{ container: { paddingTop: 0 } }}
          label="Senha"
          name="password"
          placeholder="Digite sua senha de acesso"
          fullWidth
          type="password"
          value={usuarioDetailForm.password}
          changeValue={handleChange}
        />
      </Styles.formContainer>
      <Styles.optionsContainer>
        <SysButton
          loadingPosition="start"
          mode="primary"
          label="Criar usuário"
          type="button"
          disabled={isIncomplete()}
          onClick={handleRegister}
        />
      </Styles.optionsContainer>
    </form>
  );
};

export default UsuarioDetailView;
