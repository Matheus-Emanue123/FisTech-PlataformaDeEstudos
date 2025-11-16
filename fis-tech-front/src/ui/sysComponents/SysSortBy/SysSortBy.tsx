import React, { ElementType } from "react";
import { SxProps, Theme } from "@mui/material/styles";

interface ISysSortByOption {
  key: string;
  onClick?: () => void;
  componente?: ElementType;
  resources?: Array<string>;
  otherProps?: Record<string, any>;
}

interface IGetDefaultOptions {
  onClickRecent?: () => void;
  onClickOld?: () => void;
  onClickNameAZ?: () => void;
  onClickNameZA?: () => void;
}

const getSortByDefaultOptions = ({
  onClickRecent,
  onClickOld,
  onClickNameAZ,
  onClickNameZA,
}: IGetDefaultOptions): Array<ISysSortByOption> => [
  {
    key: "recent",
    onClick: onClickRecent,
    otherProps: { label: "Mais recentes" },
  },
  {
    key: "old",
    onClick: onClickOld,
    otherProps: { label: "Mais antigos" },
  },
  {
    key: "nameAZ",
    onClick: onClickNameAZ,
    otherProps: { label: "Nome A-Z" },
  },
  {
    key: "nameZA",
    onClick: onClickNameZA,
    otherProps: { label: "Nome Z-A" },
  },
];

interface ISysSortBy {
  sx?: SxProps<Theme>;
  opcoes: Array<ISysSortByOption>;
}

const SysSortBy: React.FC<ISysSortBy> = ({
  sx,
  opcoes = getSortByDefaultOptions({}),
}) => {
  // const [selectedOption, setSelectedOption] = useState<ISysMenuItem>(opcoes[0]);
  // const menuRef = useRef<ISysMenuRef>(null);

  // const abrirMenu = (event: React.MouseEvent<HTMLElement>): void =>
  //   menuRef.current?.abrirMenu(event);
  // const onChangeOption = (opcao: ISysMenuItem): void => {
  //   setSelectedOption(opcao);
  //   menuRef.current?.fecharMenu();
  // };

  // return (
  //   <Fragment>
  //     <Styles.container sx={sx} onClick={abrirMenu}>
  //       <Typography variant="body2">Ordernar por:</Typography>
  //       <Typography variant="body2" fontWeight={400}>
  //         {selectedOption.otherProps?.label}
  //       </Typography>
  //       <ArrowDropDownIcon />
  //     </Styles.container>
  //     <SysMenu ref={menuRef} opcoes={opcoes} onClickOpcao={onChangeOption} />
  //   </Fragment>
  // );
  return null;
};

export default SysSortBy;
export { getSortByDefaultOptions };
