import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import sysSizing from "../../sysMaterialUi/sizing/sysSizes";
import sysPalette from "../../sysMaterialUi/colors/sysColors";


const NotFoundPageStyles = {
    MainContainer: styled(Box)(() => ({

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: sysSizing.spacingFixedLg

    })),

    ButtonContainer: styled(Box)(() => ({
        display: 'flex',
        flexDirection: 'column',
        gap: sysSizing.spacingFixedMd,
        alignItems: 'center',
        marginTop: sysSizing.spacingFixedLg,
        '& button': {
            minWidth: '200px',
            borderRadius: '8px',
        },
    })),

    NotFoundImage: styled('img')(() => ({
        width: '200px',
        height: '200px',
        marginBottom: sysSizing.spacingFixedLg,
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
    })),

    MainTitle: styled(Typography)(() => ({
        fontSize: '2.0rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: sysPalette.text?.primary,
        marginBottom: sysSizing.spacingFixedMd,
    })),

    SubTitle: styled(Typography)(() => ({
        marginBottom: sysSizing.spacingFixedLg,
        textAlign: 'center',
        color: sysPalette.text?.secondary,
        fontSize: '1.1rem',
        maxWidth: '700px',
        lineHeight: '1.5',
    })),

};

export default NotFoundPageStyles;