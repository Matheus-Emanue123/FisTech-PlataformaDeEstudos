import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Styles from "./NotPermissionPageStyles";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Styles.MainContainer>
           <Styles.NotPermissionImage
            src="/assets/svgs/logoEscura.svg"
            alt="Acesso Negado"
            />
            <Styles.MainTitle>
            Acesso Negado
            </Styles.MainTitle>
            <Styles.SubTitle>
              A página que você está tentando acessar é restrita e você não tem permissão para visualizá-la.
            </Styles.SubTitle>
            <Styles.ButtonContainer>
            <Button variant="contained" startIcon={<ReplyAllIcon />}  onClick={() => navigate('/')}>
                Voltar para a página inicial
            </Button>
            </Styles.ButtonContainer>
        </Styles.MainContainer>
    );
};
