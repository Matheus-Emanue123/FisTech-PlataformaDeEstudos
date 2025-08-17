import React from "react";
import Styles from "./AppLoadginStyles";
import { IconCarregando } from "./components/iconCarregando/IconCarregando";

interface IAppLoadingProps {}

export const AppLoading: React.FC<IAppLoadingProps> = () => {
  return (
    <Styles.Container>
      <IconCarregando />
    </Styles.Container>
  );
};
