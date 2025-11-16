import React, { useCallback, useContext, useEffect, useState } from "react";

import Context, { IUsuarioDetailContext } from "./usuarioDetailContext";
import UsuarioDetailView from "./usuarioDetailView";
import { PageState } from "../../../../typings/ScreenTypes";
import { UsuarioSch } from "../../api/UsuarioSch";
import { hasValue } from "../../../../utils/libs/hasValue";
import UseAuthContext from "../../../../utils/hooks/useAuth/UseAuthContext";
import SysAppContext from "../../../../app/AppContext";
import { IShowDialogProps } from "../../../../ui/sysComponents/showDialog/ShowDialog";

interface IUsuarioDetailController {
  reloadList: () => void;
  id?: string;
  type: PageState;
}

const UsuarioDetailController: React.FC<IUsuarioDetailController> = ({
  reloadList,
  id,
  type,
}) => {
  const { user } = useContext(UseAuthContext);
  const { showDialog, closeDialog } = useContext(SysAppContext);
  const [usuarioDoc, setUsuarioDoc] = useState<UsuarioSch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageType, setPageType] = useState<PageState>(type);

  //   useEffect(() => {
  //     if (pageType === "create") return;
  //     if (!hasValue(id)) console.error("ID não informado");
  //     setLoading(true);
  //     userApi.recuperarPerfilUsuario(id!).then((doc) => {
  //       const imageFile: IFile = {
  //         alt: doc?.name?.[0],
  //         type: "image",
  //       };

  //       setUserDoc({ ...doc, photoURL: imageFile });
  //       setLoading(false);
  //     });
  //   }, [id, type, pageType]);

  function createUserDoc(obj: UsuarioSch) {
    // signUp(obj).then(() => {
    //   reloadList();
    //   closeDialog();
    // });
  }

  function updateUserDoc(obj: UsuarioSch) {
    // userApi.updateUser(obj, "Usuário atualizado com sucesso").then(() => {
    //   reloadList();
    //   closeDialog();
    // });
  }

  const onSubmit = (obj: UsuarioSch) => {
    if (pageType === "create") return createUserDoc(obj);
    updateUserDoc(obj);
  };

  const providerValues: IUsuarioDetailContext = {
    pageType: pageType,
    usuarioDoc: usuarioDoc,
    onSubmit: onSubmit,
    closeModal: closeDialog,
    setPageType: setPageType,
  };

  return (
    <Context.Provider value={providerValues}>
      <UsuarioDetailView />
    </Context.Provider>
  );
};

const showCrudUsuarioModal = (
  showDialog: (options?: IShowDialogProps) => void,
  CrudUsuarioModal: IUsuarioDetailController,
  modalProps?: Omit<IShowDialogProps, "open">
) => {
  showDialog({
    children: <UsuarioDetailController {...CrudUsuarioModal} />,
    sx: {
      width: "100%",
      height: "100%",
      maxWidth: "400px",
      maxHeight: "600px",
      borderRadius: "16px",
      ...modalProps?.sx,
    },
  });
};

export default UsuarioDetailController;
export { showCrudUsuarioModal };
