import { ElementType } from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material";

interface ITextOverflow extends Omit<TypographyProps, "ref"> {
  maxLines?: number;
}

const TextOverflow: ElementType<ITextOverflow> = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "maxLines",
})<ITextOverflow>(({ maxLines }) => ({
  ...(!!maxLines && {
    display: "-webkit-box",
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "break-word",
  }),
}));

export type { ITextOverflow };
export { TextOverflow };
