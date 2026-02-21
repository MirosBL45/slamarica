import { FC, PropsWithChildren, ReactNode } from "react";

interface IBaseHasPermission extends PropsWithChildren {
  permission: boolean;
  fallback?: ReactNode;
}

export const BaseHasPermission: FC<IBaseHasPermission> = ({
  permission,
  children,
  fallback = null,
}) => {
  return <>{permission ? children : fallback}</>;
};
