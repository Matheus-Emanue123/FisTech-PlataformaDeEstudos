import { SvgIcon, SvgIconProps } from "@mui/material";

interface ISysSvgProps extends SvgIconProps {
  paths: string[];
}

export const SysSvg: React.FC<ISysSvgProps> = ({ paths, ...props }) => {
  return (
    <SvgIcon viewBox="0 0 27 27" {...props}>
      <g>
        {paths.map((caminho) => (
          <path d={caminho} />
        ))}
      </g>
    </SvgIcon>
  );
};
