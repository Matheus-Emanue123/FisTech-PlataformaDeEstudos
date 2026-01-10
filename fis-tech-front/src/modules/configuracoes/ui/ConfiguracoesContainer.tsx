import { Box, Checkbox, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import Styles from "./ConfiguracoesContainerStyles";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";

const ConfiguracoesContainer: React.FC = () => {
  // Estados mockados
  const [notificacoes, setNotificacoes] = useState({
    lembreteLicoes: true,
    subscriptionPayments: true,
    novasMensagens: true,
    conquistasAdquiridas: false,
  });

  const [preferencias, setPreferencias] = useState({
    efeitosSonoros: true,
    animacoes: true,
    exerciciosAudio: true,
  });

  const [tema, setTema] = useState<"light" | "dark" | "system">("light");

  return (
    <Styles.Container>
      <Styles.ContentWrapper>
        {/* Seção Notificações */}
        <Styles.Section>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Notificações
          </Typography>

          <Styles.SubSection>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Geral
            </Typography>

            <Styles.NotificationRow>
              <Typography variant="body2">Lembrete de lições</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Email
                </Typography>
                <Checkbox
                  checked={notificacoes.lembreteLicoes}
                  onChange={(e) =>
                    setNotificacoes({ ...notificacoes, lembreteLicoes: e.target.checked })
                  }
                />
              </Box>
            </Styles.NotificationRow>

            <Styles.NotificationRow>
              <Typography variant="body2">Subscription payments</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Email
                </Typography>
                <Checkbox
                  checked={notificacoes.subscriptionPayments}
                  onChange={(e) =>
                    setNotificacoes({ ...notificacoes, subscriptionPayments: e.target.checked })
                  }
                />
              </Box>
            </Styles.NotificationRow>

            <Styles.NotificationRow>
              <Typography variant="body2">Novas mensagens</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Email
                </Typography>
                <Checkbox
                  checked={notificacoes.novasMensagens}
                  onChange={(e) =>
                    setNotificacoes({ ...notificacoes, novasMensagens: e.target.checked })
                  }
                />
              </Box>
            </Styles.NotificationRow>

            <Styles.NotificationRow>
              <Typography variant="body2">Conquistas adquiridas</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Email
                </Typography>
                <Checkbox
                  checked={notificacoes.conquistasAdquiridas}
                  onChange={(e) =>
                    setNotificacoes({ ...notificacoes, conquistasAdquiridas: e.target.checked })
                  }
                />
              </Box>
            </Styles.NotificationRow>
          </Styles.SubSection>
        </Styles.Section>

        {/* Seção Preferences */}
        <Styles.Section>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Preferences
          </Typography>

          <Styles.SubSection>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Lesson experience
            </Typography>

            <Styles.PreferenceRow>
              <Typography variant="body2">Efeitos sonoros</Typography>
              <Switch
                checked={preferencias.efeitosSonoros}
                onChange={(e) =>
                  setPreferencias({ ...preferencias, efeitosSonoros: e.target.checked })
                }
              />
            </Styles.PreferenceRow>

            <Styles.PreferenceRow>
              <Typography variant="body2">Animações</Typography>
              <Switch
                checked={preferencias.animacoes}
                onChange={(e) =>
                  setPreferencias({ ...preferencias, animacoes: e.target.checked })
                }
              />
            </Styles.PreferenceRow>

            <Styles.PreferenceRow>
              <Typography variant="body2">Exercícios de Áudio</Typography>
              <Switch
                checked={preferencias.exerciciosAudio}
                onChange={(e) =>
                  setPreferencias({ ...preferencias, exerciciosAudio: e.target.checked })
                }
              />
            </Styles.PreferenceRow>
          </Styles.SubSection>
        </Styles.Section>

        {/* Seção Appearance */}
        <Styles.Section>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Appearance
          </Typography>

          <Styles.ThemeGrid>
            <Styles.ThemeButton
              selected={tema === "light"}
              onClick={() => setTema("light")}
            >
              <LightModeOutlinedIcon />
              <Typography variant="body2">Light</Typography>
            </Styles.ThemeButton>

            <Styles.ThemeButton
              selected={tema === "dark"}
              onClick={() => setTema("dark")}
            >
              <DarkModeOutlinedIcon />
              <Typography variant="body2">Dark</Typography>
            </Styles.ThemeButton>

            <Styles.ThemeButton
              selected={tema === "system"}
              onClick={() => setTema("system")}
            >
              <SettingsBrightnessOutlinedIcon />
              <Typography variant="body2">System</Typography>
            </Styles.ThemeButton>
          </Styles.ThemeGrid>
        </Styles.Section>
      </Styles.ContentWrapper>
    </Styles.Container>
  );
};

export default ConfiguracoesContainer;
