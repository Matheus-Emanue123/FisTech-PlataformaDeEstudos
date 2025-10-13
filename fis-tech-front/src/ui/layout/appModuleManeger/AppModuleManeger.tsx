import { HeaderSvgs } from "../../../utils/svg/headerSvgs";

export interface IAppHeaderButton {
  label: string;
  path: string;
  active: boolean;
  isProtected: boolean;
  icon: string[];
  action: () => void;
}

export const sysAppHeaderOptions: IAppHeaderButton[] = [
  {
    label: "Exemplo",
    path: "/",
    icon: HeaderSvgs["homeOutlined"],
    active: true,
    isProtected: false,
    action: () => console.log("Clicou em Exemplo"),
  },
  {
    label: "Usuários",
    path: "/usuarios",
    icon: HeaderSvgs["userOutlined"],
    active: true,
    isProtected: false,
    action: () => console.log("Clicou em Usuários"),
  },
  // {
  //   label: "Home",
  //   path: "/home",
  //   icon: [],
  //   active: true,
  //   isProtected: false,
  //   action: () => console.log("Clicou em Home"),
  // },
  // {
  //   label: "Estatísticas",
  //   path: "/estatiscas",
  //   icon: [],
  //   active: true,
  //   isProtected: false,
  //   action: () => console.log("Clicou em Estatisticas"),
  // },
  // {
  //   label: "Conquistas",
  //   path: "/conquistas",
  //   icon: [],
  //   active: true,
  //   isProtected: false,
  //   action: () => console.log("Clicou em Conquistas"),
  // },
  {
    label: "Atividades",
    path: "/atividades",
    icon: HeaderSvgs["editOutlined"],
    active: true,
    isProtected: true,
    action: () => console.log("Clicou em Atividades"),
  },
  // {
  //   label: "Idioma",
  //   path: "/idioma",
  //   icon: [],
  //   active: true,
  //   isProtected: false,
  //   action: () => console.log("Clicou em Idioma"),
  // },
  // {
  //   label: "Configurações",
  //   path: "configuracoes",
  //   icon: [],
  //   active: true,
  //   isProtected: false,
  //   action: () => console.log("Clicou em Configurações"),
  // },
];

export const getValueAppHeader = (path: string): number => {
  const suffix = path.split("/")[1];
  return sysAppHeaderOptions.findIndex((route) => route.path.includes(suffix));
};
