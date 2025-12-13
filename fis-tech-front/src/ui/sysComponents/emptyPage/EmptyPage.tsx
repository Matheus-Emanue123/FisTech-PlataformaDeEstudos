import React from "react";
import { SxProps, Typography } from "@mui/material";
import Styles from "./EmptyPageStyles";

interface IEmptyListProps {
  imgSrc: string;
  title: string;
  label: string;
  sx?: {
    container?: SxProps;
    header?: SxProps;
    img?: SxProps;
    title?: SxProps;
    label?: SxProps;
  };
}

const EmptyList: React.FC<IEmptyListProps> = React.memo(
  ({ imgSrc, title, label, sx }) => {
    return (
      <Styles.Container sx={sx?.container}>
        <Styles.Img component="img" src={imgSrc} sx={sx?.img} />
        <Styles.Header>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2">{label}</Typography>
        </Styles.Header>
      </Styles.Container>
    );
  }
);

export default EmptyList;
