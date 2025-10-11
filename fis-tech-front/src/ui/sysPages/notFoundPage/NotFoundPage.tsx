import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Styles from "./NotFoundPageStyles";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Styles.MainContainer>
           <Styles.NotFoundImage
                src="/assets/svgs/logoEscura.svg"
                alt="Página não encontrada"
            />
            {/* <Styles.MainTitle>
                Oops! Esta página entrou em um buraco negro!
            </Styles.MainTitle>
            <Styles.SubTitle>
                Parece que essa página violou as leis da física e desapareceu no espaço-tempo!
            </Styles.SubTitle> */}
            <Styles.MainTitle>
                Página não encontrada
            </Styles.MainTitle>
            <Styles.SubTitle>
               A página que você está tentando acessar não existe ou está indisponível no momento.
            </Styles.SubTitle>
            <Styles.ButtonContainer>
                <Button variant="contained" startIcon={<ReplyAllIcon />}  onClick={() => navigate('/')}>
                    Voltar para a página inicial
                </Button>
            </Styles.ButtonContainer>
        </Styles.MainContainer>
    );
};
