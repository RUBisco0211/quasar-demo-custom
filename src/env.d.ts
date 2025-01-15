/* eslint-disable */

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
        VUE_ROUTER_BASE: string | undefined;
        readonly VITE_APP_NAME: string;
        readonly VITE_APP_LOGO: string;
        readonly VITE_APP_API: string;
    }
}
