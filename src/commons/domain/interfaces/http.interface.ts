export type Response = {
  status: number;
  data: any;
}

export interface IHTTPClientPort {
  get(url: string, token: string): Promise<Response>;
  post(url: string, token: string, body: object, headers: object): Promise<Response>;
  patch(url: string, token: string, body: object, headers: object): Promise<Response>;
}
