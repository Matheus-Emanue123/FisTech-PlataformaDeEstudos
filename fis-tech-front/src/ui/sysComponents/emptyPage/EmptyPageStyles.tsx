import { Box, BoxProps, styled } from "@mui/material";
import { ElementType } from "react";
import sysSizing from "../../sysMaterialUi/sizing/sysSizes";

interface IStyles {
  Container: ElementType<BoxProps>;
  Header: ElementType<BoxProps>;
  Img: ElementType<BoxProps<"img">>;
}

const EmptyListStyles: IStyles = {
  Container: styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "285px",
    width: "100%",
    gap: sysSizing.spacingRemMd,
  })),
  Header: styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: sysSizing.spacingFixedXs,
  })),
  Img: styled(Box)(({}) => ({
    height: "150px",
    width: "150px",
    objectFit: "fill",
  })),
};

export default EmptyListStyles;
