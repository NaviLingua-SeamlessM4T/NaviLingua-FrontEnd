import "vite/client";
declare global {
  namespace ImportMeta {
    interface Env {
      VITE_ENDPOINT: string;
      // other properties
    }
    // other interfaces or nested namespaces
  }
  namespace NodeJS {
    interface ProcessEnv {
      VITE_ENDPOINT?: string;
      GITHUB_AUTH_TOKEN?: string;
      NODE_ENV?: "development" | "production";
      PORT?: string;
      PWD: string;
    }
    // other interfaces or nested namespaces
  }
}
export {};
