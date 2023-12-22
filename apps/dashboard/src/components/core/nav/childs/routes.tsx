"use client";

import { Children, ComponentProps } from "react";

import { RouteItem } from "./route-item";
import { RouteNavitagionItem } from "./route-navigation-item";
import { cn } from "@/lib/utils";
import { useRoutes } from "./routes.hook";

type Props = ComponentProps<"div">;

export const Routes = ({ className }: Props) => {
    const { routes } = useRoutes();

    return (
        <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
            {Children.toArray(
                routes.map((route) =>
                    route.childs && route.childs?.length > 0 ? (
                        <RouteNavitagionItem route={route} />
                    ) : (
                        <RouteItem route={route} />
                    )
                )
            )}
        </nav>
    );
};
