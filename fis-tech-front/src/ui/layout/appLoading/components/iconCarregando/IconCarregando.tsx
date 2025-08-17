import React from "react";
import Styles from "./IconCarregandoStyles";

interface IIconCarregandoProps {}

export const IconCarregando: React.FC<IIconCarregandoProps> = () => {
  return (
    <Styles.Container>
      <Styles.LoadingWapper>
        <Styles.LoadingArea>
          <Styles.ImgLoading
            component="img"
            src="assets/svgs/LogoIconEscuro.svg"
            alt="Ícone FisTech"
          />
        </Styles.LoadingArea>
        <Styles.LoadingText>
          Carregando
          <Styles.ReticenciaLoading component="span">
            .
          </Styles.ReticenciaLoading>
          <Styles.ReticenciaLoading component="span">
            .
          </Styles.ReticenciaLoading>
          <Styles.ReticenciaLoading component="span">
            .
          </Styles.ReticenciaLoading>
        </Styles.LoadingText>
      </Styles.LoadingWapper>
    </Styles.Container>
  );
};
