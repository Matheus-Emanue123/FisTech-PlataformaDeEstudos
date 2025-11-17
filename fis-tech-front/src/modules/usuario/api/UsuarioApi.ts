import { ApiBase } from "../../../utils/ApiBase/ApiBase";
import { UsuarioSch } from "./UsuarioSch";

class UsuarioApi extends ApiBase<UsuarioSch> {
  constructor() {
    super("/users");
  }

  public async listar(
    filtros?: Partial<UsuarioSch>,
    page = 0,
    size = 10,
    callback?: (error: string | null, data?: UsuarioSch[]) => void
  ): Promise<UsuarioSch[]> {
    try {
      const response = (await this.pesquisar("/", filtros, { page, size }))
        .data;
      const usuariosBrutos = response.data;
      const listaFormatada: UsuarioSch[] = usuariosBrutos.map(
        (usuario: any) => ({
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          userType: usuario.UserType?.tipo,
        })
      );

      callback?.(null, listaFormatada);
      return listaFormatada;
    } catch (err: unknown) {
      let customError: any;

      try {
        this.throwAxiosError(err);
      } catch (capturado: any) {
        customError = capturado;
      }

      const mensagem =
        customError?.message || "Erro desconhecido ao listar usuários";

      callback?.(mensagem);
      throw customError;
    }
  }

  public async getById(
    id: number,
    callback?: (error: string | null, data?: UsuarioSch) => void
  ) {
    try {
      const response = (await this.getOne(id.toString())).data;
      const usuarioBruto = {
        id: response.data.id,
        nome: response.data.nome,
        email: response.data.email,
        userType: response.data.UserType.tipo,
      };

      callback?.(null, usuarioBruto);
      return usuarioBruto;
    } catch (err: unknown) {
      let customError: any;

      try {
        this.throwAxiosError(err);
      } catch (capturado: any) {
        customError = capturado;
      }

      const mensagem =
        customError?.message || "Erro desconhecido ao listar usuários";

      callback?.(mensagem);
      throw customError;
    }
  }

  public criar(dto: UsuarioSch) {
    return this.post("", dto);
  }

  public atualizar(id: string, dto: UsuarioSch) {
    return this.put(id, dto);
  }

  public deletar(id: string) {
    return this.delete(id);
  }
}

export const usuarioApi = new UsuarioApi();
