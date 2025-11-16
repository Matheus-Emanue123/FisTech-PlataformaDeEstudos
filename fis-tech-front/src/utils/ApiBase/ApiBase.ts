import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import { IParams } from "../../typings/ApiBaseTypings";
import { BACKEND_URL } from "../../typings/ConfigEnvironment";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export class ApiBase<T> {
  private api: AxiosInstance;
  private baseUrl: string;

  constructor(basePath: string) {
    this.baseUrl = this.getBaseURL() + basePath;

    this.api = axios.create({
      baseURL: this.baseUrl,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    });

    this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = this.getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );
  }

  private getBaseURL(): string {
    return BACKEND_URL ?? "http://localhost:8080";
  }

  private getAuthToken(): string | null {
    return localStorage.getItem("authToken");
  }

  public async request(
    method: HttpMethod,
    url: string,
    bodyOrParams?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.request<T>({
      method,
      url,
      params:
        method === "get" || method === "delete" ? bodyOrParams : undefined,
      data: method !== "get" && method !== "delete" ? bodyOrParams : undefined,
      ...config,
    });
  }

  protected throwAxiosError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const custom = {
        isAxiosError: true,
        message: error.response?.data?.error?.message || "Erro desconhecido",
        response: error.response,
      };
      throw custom;
    }
    throw error instanceof Error ? error : new Error("Erro desconhecido");
  }
  
  protected pesquisar(
    url: string,
    filtrosDto?: any,
    queryParams?: IParams
  ): Promise<AxiosResponse<any>> {
    const queryString = queryParams
      ? "?" + qs.stringify(queryParams, { arrayFormat: "repeat" })
      : "";
    return this.request("get", `${url}`, filtrosDto); //${queryString}
  }

  protected getOne(id: string): Promise<AxiosResponse<T>> {
    return this.request("get", `/${id}`);
  }

  protected post(url: string, dto: T): Promise<AxiosResponse<T>> {
    return this.request("post", url, dto);
  }

  protected put(id: string, dto: T): Promise<AxiosResponse<T>> {
    return this.request("put", `/${id}`, dto);
  }

  protected patch(id: string, dto: Partial<T>): Promise<AxiosResponse<T>> {
    return this.request("patch", `/${id}`, dto);
  }

  protected delete(id: string): Promise<AxiosResponse<T>> {
    return this.request("delete", `/${id}`);
  }
}
