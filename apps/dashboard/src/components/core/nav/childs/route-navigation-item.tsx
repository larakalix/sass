import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Children } from "react";
import { Route } from "./type";
import { RouteItem } from "./route-item";

type Props = {
    route: Route;
};

export const RouteNavitagionItem = ({ route }: Props) => {
    const { href, label, active, childs } = route;

    if (!childs) return;

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex flex-col gap-3 p-4 w-[135px]">
                            {Children.toArray(
                                childs?.map((route) => (
                                    <li>
                                        <RouteItem route={route} />
                                    </li>
                                ))
                            )}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
