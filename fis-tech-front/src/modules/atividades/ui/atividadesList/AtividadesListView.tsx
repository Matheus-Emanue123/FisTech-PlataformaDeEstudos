import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import Styles from "./AtividadesListViewStyles";
import UseAppContext from "../../../../app/AppContext";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

interface AtividadeListViewProps {}

const mockStats = {
  inProgress: 1,
  completed: 10,
  modulesCompleted: 4,
  weeklyRanking: 5,
};
const mockTopics = [
  {
    id: 1,
    title: "Módulos - Cinemática",
    subtitle: "Choose a category to begin a lesson.",
    subtopics: [
      { id: 1, title: "Movimento Uniforme" },
      { id: 2, title: "Movimento Variado" },
      { id: 3, title: "Queda Livre" },
      { id: 4, title: "Lançamento Oblíquo" },
    ],
  },
  {
    id: 2,
    title: "Módulos - Dinâmica",
    subtitle: "Choose a category to begin a lesson.",
    subtopics: [
      { id: 5, title: "Leis de Newton" },
      { id: 6, title: "Forças" },
      { id: 7, title: "Atrito" },
      { id: 8, title: "Plano Inclinado" },
    ],
  },
  {
    id: 3,
    title: "Módulos - Energia",
    subtitle: "Choose a category to begin a lesson.",
    subtopics: [
      { id: 9, title: "Trabalho" },
      { id: 10, title: "Energia Cinética" },
      { id: 11, title: "Energia Potencial" },
      { id: 12, title: "Conservação de Energia" },
    ],
  },
  {
    id: 4,
    title: "Módulos - Eletrostática",
    subtitle: "Choose a category to begin a lesson.",
    subtopics: [
      { id: 13, title: "Carga Elétrica" },
      { id: 14, title: "Lei de Coulomb" },
      { id: 15, title: "Campo Elétrico" },
      { id: 16, title: "Potencial Elétrico" },
    ],
  },
];

export const HomePage: React.FC<AtividadeListViewProps> = () => {
  const { showNotification } = useContext(UseAppContext);
  const [expandedTopics, setExpandedTopics] = useState<number[]>([]);

  const toggleTopic = (topicId: number) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubtopicClick = (subtopicTitle: string) => {
    showNotification({
      open: true,
      type: "success",
      message: `Subtópico "${subtopicTitle}" selecionado`,
    });
  };

  return (
    <Styles.PageContainer>
      <Styles.ContentWrapper>
        <Styles.HeaderSection>
          <Styles.PageTitle variant="h3">Visão Geral</Styles.PageTitle>
        </Styles.HeaderSection>

        <Styles.StatsContainer>
          <Styles.StatCard>
            <Styles.StatIconWrapper iconcolor="#ff6b6b">
              <Box component="span">📝</Box>
            </Styles.StatIconWrapper>
            <Styles.StatNumber variant="h2">
              {mockStats.inProgress}
            </Styles.StatNumber>
            <Styles.StatLabel variant="body2">
              Atividades em progresso
            </Styles.StatLabel>
          </Styles.StatCard>

          <Styles.StatCard>
            <Styles.StatIconWrapper iconcolor="#51cf66">
              <Box component="span">✓</Box>
            </Styles.StatIconWrapper>
            <Styles.StatNumber variant="h2">
              {mockStats.completed}
            </Styles.StatNumber>
            <Styles.StatLabel variant="body2">
              Atividades concluídas
            </Styles.StatLabel>
          </Styles.StatCard>

          <Styles.StatCard>
            <Styles.StatIconWrapper iconcolor="#4c6ef5">
              <Box component="span">📚</Box>
            </Styles.StatIconWrapper>
            <Styles.StatNumber variant="h2">
              {mockStats.modulesCompleted}
            </Styles.StatNumber>
            <Styles.StatLabel variant="body2">
              Módulos concluídos
            </Styles.StatLabel>
          </Styles.StatCard>

          <Styles.StatCard>
            <Styles.StatIconWrapper iconcolor="#ffd43b">
              <Box component="span">⭐</Box>
            </Styles.StatIconWrapper>
            <Styles.StatNumber variant="h2">
              {mockStats.weeklyRanking}
            </Styles.StatNumber>
            <Styles.StatLabel variant="body2">Ranking Semanal</Styles.StatLabel>
          </Styles.StatCard>
        </Styles.StatsContainer>
        <Styles.TopicsSection>
          {mockTopics.map((topic) => {
            const isExpanded = expandedTopics.includes(topic.id);
            return (
              <Styles.TopicContainer key={topic.id}>
                <Styles.TopicHeader onClick={() => toggleTopic(topic.id)}>
                  <Box>
                    <Styles.TopicTitleRow>
                      <Styles.TopicTitle variant="h4">
                        {topic.title}
                      </Styles.TopicTitle>
                      <Styles.ExpandIcon isexpanded={isExpanded.toString()}>
                        {isExpanded ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )}
                      </Styles.ExpandIcon>
                    </Styles.TopicTitleRow>
                    <Styles.TopicSubtitle variant="body1">
                      {topic.subtitle}
                    </Styles.TopicSubtitle>
                  </Box>
                </Styles.TopicHeader>

                {isExpanded && (
                  <Styles.SubtopicsGrid>
                    {topic.subtopics.map((subtopic) => (
                      <Styles.SubtopicCard
                        key={subtopic.id}
                        onClick={() => handleSubtopicClick(subtopic.title)}
                      >
                        <Styles.SubtopicTitle variant="subtitle1">
                          {subtopic.title}
                        </Styles.SubtopicTitle>
                      </Styles.SubtopicCard>
                    ))}
                  </Styles.SubtopicsGrid>
                )}
              </Styles.TopicContainer>
            );
          })}
        </Styles.TopicsSection>
      </Styles.ContentWrapper>
    </Styles.PageContainer>
  );
};
