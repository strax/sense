declare module "webpack-serve" {
  export interface WebpackServer {
    on(event: string, cb: (server: WebpackServer) => void): void;
    close(): void;
  }

  export default function(options?: object): Promise<WebpackServer>;
}
