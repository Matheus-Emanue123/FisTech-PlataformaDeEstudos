import React, { useContext, useEffect, useState, useRef } from "react";
import Styles from "./usuarioListViewStyles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Zoom from "@mui/material/Zoom";
import TablePagination from "@mui/material/TablePagination";
import { useMediaQuery, useTheme } from "@mui/system";
import Context, { IUsuarioListContext } from "./usuarioListContext";
import UseAuthContext from "../../../../utils/hooks/useAuth/UseAuthContext";
import { UserType } from "../../config/EnumUserType";
import UserCard from "./components/usuarioCard/usuarioCard";
import EmptyList from "../../../../ui/sysComponents/emptyPage/EmptyPage";
import UseAppContext from "../../../../app/AppContext";

const UsuarioLisView = () => {
  const context = useContext<IUsuarioListContext>(Context);
  const { openUsuarioDetail } = useContext(UseAppContext);

  const [scrolled, setScrolled] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState<string>("");
  const [selectFieldValue, setSelectFieldValue] = useState<string>("");
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const containerRef = useRef<HTMLElement | null>(null);

  const handleOpenDetails = (type: boolean, id: number) => {
    openUsuarioDetail(() => {}, type ? "edit" : "view", id);
  };

  const onChangeTextField = (value?: string) => {
    setTextFieldValue(value || "");
    context.setSearchByText(value);
  };

  const onChangeSwitch = (value?: boolean) => {
    setSwitchValue(value || false);
    context.setShowDisabled(value);
  };

  const onChangeSelect = (value?: UserType) => {
    setSelectFieldValue(value || "");
    context.setSearchByProfile(value);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrolled(containerRef.current.scrollTop > 10);
      }
    };

    const container = document.getElementById("contentWrapper");
    if (container) {
      containerRef.current = container;
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const theme = useTheme();
  const isScrenSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Styles.Container>
      <Styles.Header isFixed={scrolled}>
        <Styles.HeaderLine>
          <Typography variant="h5"> Usuários </Typography>
          <Zoom in={scrolled && !isScrenSmallerThanMd}>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              {/* <UserListFilterComponent
                textFieldValue={textFieldValue}
                selectFieldValue={selectFieldValue}
                switchValue={switchValue}
                onTextFieldChange={onChangeTextField}
                onSelectChange={onChangeSelect}
                onSwitchChange={onChangeSwitch}
                sx={{ flexDirection: { xs: "row", sm: "row", md: "row" } }}
              /> */}
              <Box>Futuro Filtro</Box>
            </Box>
          </Zoom>
        </Styles.HeaderLine>
        <Collapse
          in={!scrolled || isScrenSmallerThanMd}
          sx={{ width: "100%" }}
          timeout={300}
        >
          <Box sx={{ minHeight: "42px" }}>
            {/* <UserListFilterComponent
              textFieldValue={textFieldValue}
              selectFieldValue={selectFieldValue}
              switchValue={switchValue}
              onTextFieldChange={onChangeTextField}
              onSelectChange={onChangeSelect}
              onSwitchChange={onChangeSwitch}
            /> */}
            <Box>Futuro Filtro</Box>
          </Box>
        </Collapse>
      </Styles.Header>
      <Styles.Body>
        {/* <SysSortBy
          sx={{ alignSelf: "flex-end" }}
          opcoes={getSortByDefaultOptions({
            onClickRecent: () => context.setSort(["createdAt.DESC"]),
            onClickOld: () => context.setSort(["createdAt.ASC"]),
            onClickNameAZ: () => context.setSort(["name.ASC"]),
            onClickNameZA: () => context.setSort(["name.DESC"]),
          })}
        /> */}
        <Box>Componente de SysSortBy</Box>
        <Styles.UsuarioListContainer>
          {context.usuarioList.length === 0 ? (
            <EmptyList
              imgSrc="/assets/imgs/EmptyPage.png"
              title="Sem usuários"
              label="No momento não foi encontrado nenhum usuário"
            />
          ) : (
            context.usuarioList.map((user) => (
              <UserCard
                key={user!.id}
                onEditClick={() => handleOpenDetails(true, user.id!)}
                onViewClick={() => handleOpenDetails(false, user.id!)}
                onDesableClick={() => console.log("opa")}
                onEnableClick={() => console.log("opa")}
                nome={user!.nome}
                email={user!.email}
                userType={user!.userType}
              />
            ))
          )}
        </Styles.UsuarioListContainer>
      </Styles.Body>
      <TablePagination
        component="div"
        count={10}
        page={context.currentPage - 1}
        onPageChange={(_, page) => context.setPagination(page + 1)}
        rowsPerPage={context.itensPerPage}
        onRowsPerPageChange={(event) =>
          context.setItensPerPage(parseInt(event.target.value, 10))
        }
        labelRowsPerPage="Itens por página"
      />
    </Styles.Container>
  );
};

export default UsuarioLisView;
