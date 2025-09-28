import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { SvgIconProps } from "@mui/material/SvgIcon/SvgIcon";

export interface IAppHeaderButton {
  label: string;
  path: string;
  active: boolean;
  isProtected: boolean;
  icon: React.ReactElement<SvgIconProps>;
  action: () => void;
}

const widthIcons = "24px";
const heightIcons = "24px";

export const sysAppHeaderOptions: IAppHeaderButton[] = [
  {
    label: "Exemplo",
    path: "/example",
    icon: (
      <DescriptionOutlinedIcon
        sx={{ width: widthIcons, height: heightIcons }}
      />
    ),
    active: true,
    isProtected: false,
    action: () => console.log("Clicou em Exemplo"),
  },
  {
    label: "Usuários",
    path: "/usuarios",
    icon: (
      <PersonOutlineOutlinedIcon
        sx={{ width: widthIcons, height: heightIcons }}
      />
    ),
    active: true,
    isProtected: false,
    action: () => console.log("Clicou em Usuários"),
  },
  // {
  //   label: "Home",
  //   path: "/home",
  //   icon: ,
  //   active: true,
  //   isProtected: false,
  //   action: () => console.log("Clicou em Home"),
  // },
  // {
  //   label: "Estatísticas",
  //   path: "/estatiscas",
  //   icon: ,
  //   active: true,
  //   isProtected: false,
  //   action: () => console.log("Clicou em Estatisticas"),
  // },
  // {
  //   label: "Conquistas",
  //   path: "/conquistas",
  //   icon: ,
  //   active: true,
  //   isProtected: false,
  //   action: () => console.log("Clicou em Conquistas"),
  // },
  {
    label: "Atividades",
    path: "/atividades",
    icon: (
      <ContentPasteGoIcon sx={{ width: widthIcons, height: heightIcons }} />
    ),
    active: true,
    isProtected: true,
    action: () => console.log("Clicou em Atividades"),
  },
  // {
  //   label: "Idioma",
  //   path: "/idioma",
  //   icon: ,
  //   active: true,
  //   isProtected: false,
  //   action: () => console.log("Clicou em Idioma"),
  // },
  // {
  //   label: "Configurações",
  //   path: "configuracoes",
  //   icon: ,
  //   active: true,
  //   isProtected: false,
  //   action: () => console.log("Clicou em Configurações"),
  // },
];

export const getValueAppHeader = (path: string): number => {
  const suffix = path.split("/")[1];
  return sysAppHeaderOptions.findIndex((route) => route.path.includes(suffix));
};
