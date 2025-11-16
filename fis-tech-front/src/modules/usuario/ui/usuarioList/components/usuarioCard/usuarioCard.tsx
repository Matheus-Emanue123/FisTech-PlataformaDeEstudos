import React from "react";
import Styles from "./usuarioCardStyles";
import BlockIcon from "@mui/icons-material/Block";
import Typogrphy from "@mui/material/Typography";
import { UsuarioSch } from "../../../../api/UsuarioSch";
import { TextOverflow } from "../../../../../../ui/sysComponents/textOverflow/TextOverflowStyles";
import {
  BasicMenu,
  IoptionsToBasicMenu,
} from "../../../../../../ui/sysComponents/basicMenu/BasicMenu";
import SysAvatar from "../../../../../../ui/sysComponents/sysAvatar/sysAvatar";

interface IUsuarioCard extends UsuarioSch {
  onViewClick?: (usuarioId?: number) => void;
  onEditClick?: (usuarioId?: number) => void;
  onDesableClick?: (usuarioId?: number) => void;
  onEnableClick?: (usuarioId?: number) => void;
  disabled?: boolean;
}

const UsuarioCard: React.FC<IUsuarioCard> = ({
  id,
  nome,
  disabled = false,
  email,
  userType,
  onViewClick,
  onEditClick,
  onDesableClick,
  onEnableClick,
}) => {
  const menuOptions: Array<IoptionsToBasicMenu> = [
    {
      onClick: () => onViewClick?.(id),
      label: "Visualizar",
    },
    {
      onClick: () => onEditClick?.(id),
      label: "Editar",
    },
    {
      onClick: () => (disabled ? onEnableClick?.(id) : onDesableClick?.(id)),
      label: disabled ? "Habilitar" : "Desabilitar",
    },
  ];

  return (
    <Styles.container>
      <Styles.rowContainer>
        <SysAvatar name={nome} />
        <TextOverflow maxLines={1} variant="subtitle1" sx={{ flex: 1 }}>
          {nome}
        </TextOverflow>
        {disabled && <BlockIcon name="block" color="error" />}
        <BasicMenu
          options={menuOptions}
          indexOfComponent={`MenuCardUsuario${id}`}
        />
      </Styles.rowContainer>

      <Styles.rowContainer>
        <TextOverflow maxLines={1} variant="body2" sx={{ flex: 1 }}>
          {email}
        </TextOverflow>
        <Typogrphy variant="body2">{userType}</Typogrphy>
      </Styles.rowContainer>
    </Styles.container>
  );
};

export default UsuarioCard;
