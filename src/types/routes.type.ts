import { routes } from "@/constants/routes";

type ExtractRoutes<T> = T extends string
  ? T
  : {
      [K in keyof T]: ExtractRoutes<T[K]>;
    }[keyof T];

export type AppRoute = ExtractRoutes<typeof routes>;
