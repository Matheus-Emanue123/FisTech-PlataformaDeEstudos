import React, { useContext, useEffect, useState } from "react";
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
import { USER_TYPE_LABELS, UserType } from "../../config/EnumUserType";
import { SysSelectField } from "../../../../ui/sysComponents/sysForm/sysSelectField/SysSelectField";

type IUsuarioDetailCreateForm = {
  nome: string;
  email: string;
  password: string;
};

type IUsuarioDetailEditForm = {
  nome: string | undefined;
  type: UserType | undefined;
};

const UsuarioDetailView: React.FC = () => {
  const context = useContext<IUsuarioDetailContext>(UsuarioDetailContext);
  const { register } = useContext(UseAuthContext);
  const { showLoading, showNotification, closeDialog } =
    useContext(UseAppContext);

  console.log(register);
  const isCreate = context.pageType === "create";
  const isView = context.pageType === "view";
  const isEdit = context.pageType === "edit";

  const [usuarioDetailCreateForm, setUsuarioDetailCreateForm] =
    useState<IUsuarioDetailCreateForm>({
      nome: "",
      email: "",
      password: "",
    });

  const [usuarioDetailEditForm, setUsuarioDetailEditForm] =
    useState<IUsuarioDetailEditForm>({
      nome: context.usuarioDoc?.nome,
      type: context.usuarioDoc?.userType,
    });

  useEffect(() => {
    setUsuarioDetailEditForm({
      nome: context.usuarioDoc?.nome,
      type: context.usuarioDoc?.userType,
    });
  }, [context.usuarioDoc]);

  const handleChange = (event: any) => {
    if (isCreate) {
      setUsuarioDetailCreateForm({
        ...usuarioDetailCreateForm,
        [event.target.name]: event.target.value,
      });
      return;
    }
    setUsuarioDetailEditForm({
      ...usuarioDetailEditForm,
      [event.target.name]: event.target.value,
    });
  };

  const isIncomplete = (): boolean => {
    if (isCreate) {
      const { nome, email, password } = usuarioDetailCreateForm;
      const allFilled = nome.trim() && email.trim() && password.trim();
      return !allFilled;
    } else if (isEdit) {
      const { nome, type } = usuarioDetailEditForm;
      const allFilled = nome?.trim() && type?.trim();
      return !allFilled;
    }
    return false;
  };

  const handleRegister = async () => {
    closeDialog();
    showLoading(true);
    await register(
      usuarioDetailCreateForm.nome,
      usuarioDetailCreateForm.email,
      usuarioDetailCreateForm.password,
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

  const handleUpdate = async () => {
    closeDialog();
    showLoading(true);
    // context.onSubmit({ ...usuarioDetailEditForm, ...context.usuarioDoc });
    showLoading(false);
  };

  return (
    <form
      style={{
        height: "100%",
      }}
    >
      <Styles.PageContainer>
        <Styles.InformativeContainer>
          <Typography variant="h5">
            {isCreate ? "Cadastrar " : isView ? "Visualizar " : "Editar "}
            usuário
          </Typography>
          <IconButton onClick={() => context.closeModal()}>
            <CloseIcon name="close" />
          </IconButton>
        </Styles.InformativeContainer>
        <Styles.FormContainer
          sx={{ gap: isView ? "50px" : isEdit ? "25px" : "" }}
        >
          {(isView || isEdit || isCreate) && (
            <SysTextField
              sx={{ container: { paddingTop: 0, paddingBottom: 0 } }}
              label="Nome"
              name="nome"
              placeholder="Digite seu nome"
              fullWidth
              type="nome"
              value={
                isCreate
                  ? usuarioDetailCreateForm.nome
                  : usuarioDetailEditForm.nome ?? context.usuarioDoc?.nome ?? ""
              }
              changeValue={handleChange}
              readOnly={isView}
            />
          )}
          {isCreate && (
            <SysTextField
              label="Email"
              name="email"
              placeholder="Digite seu e-mail de acesso"
              fullWidth
              value={usuarioDetailCreateForm.email}
              changeValue={handleChange}
              readOnly={isView}
            />
          )}
          {(isView || isEdit) && (
            <SysSelectField
              name="type"
              nameField="typeOfUser"
              label="Tipo do usuário"
              value={
                usuarioDetailEditForm.type?.toString() ??
                context.usuarioDoc?.userType ??
                ""
              }
              changeValue={handleChange}
              options={Object.values(UserType).map((value) => ({
                label: USER_TYPE_LABELS[value],
                value: value,
              }))}
              placeholder="Selecione uma data"
              readOnly={isView}
            />
          )}
          {isCreate && (
            <SysTextField
              sx={{ container: { paddingTop: 0 } }}
              label="Senha"
              name="password"
              placeholder="Digite sua senha de acesso"
              fullWidth
              type="password"
              value={usuarioDetailCreateForm.password}
              changeValue={handleChange}
            />
          )}
        </Styles.FormContainer>
        <Styles.OptionsContainer>
          <SysButton
            loadingPosition="start"
            mode="primary"
            label={`${
              isCreate ? "Cadastrar " : isView ? "Editar " : "Salvar "
            } usuário`}
            type="button"
            disabled={isIncomplete()}
            onClick={handleRegister}
          />
        </Styles.OptionsContainer>
      </Styles.PageContainer>
    </form>
  );
};

export default UsuarioDetailView;
