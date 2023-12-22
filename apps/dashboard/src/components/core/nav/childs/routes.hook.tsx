import { useParams, usePathname } from "next/navigation";

import { Route } from "./type";

export const useRoutes = (): {
    routes: Route[];
} => {
    const pathname = usePathname();
    const params = useParams();

    const routes: Route[] = [
        {
            href: `/${params.storeId}`,
            label: "Overview",
            active: pathname === `/${params.storeId}`,
        },
        {
            href: "",
            label: "E-Commerce",
            active: false,
            childs: [
                {
                    href: `/${params.storeId}/sizes`,
                    label: "Sizes",
                    active: pathname === `/${params.storeId}/sizes`,
                },
                {
                    href: `/${params.storeId}/products`,
                    label: "Products",
                    active: pathname === `/${params.storeId}/products`,
                },
                {
                    href: `/${params.storeId}/colors`,
                    label: "Colors",
                    active: pathname === `/${params.storeId}/colors`,
                },
                {
                    href: `/${params.storeId}/orders`,
                    label: "Orders",
                    active: pathname === `/${params.storeId}/orders`,
                },
                {
                    href: `/${params.storeId}/categories`,
                    label: "Categories",
                    active: pathname === `/${params.storeId}/categories`,
                },
            ],
        },
        {
            href: "",
            label: "Landing",
            active: false,
            childs: [
                {
                    href: `/${params.storeId}/landings`,
                    label: "Landing",
                    active: pathname === `/${params.storeId}/landings`,
                },
            ],
        },
        {
            href: `/${params.storeId}/forms`,
            label: "Forms",
            active: pathname === `/${params.storeId}/forms`,
        },
        {
            href: `/${params.storeId}/images`,
            label: "Images",
            active: pathname === `/${params.storeId}/images`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`,
        },
    ];

    return { routes };
};
