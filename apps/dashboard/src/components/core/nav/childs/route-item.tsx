import Link from "next/link";
import { Route } from "./type";
import { cn } from "@/lib/utils";

type Props = {
    route: Route;
};

export const RouteItem = ({ route }: Props) => {
    const { href, label, active } = route;
    
    return (
        <Link
            href={href}
            className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                active
                    ? "text-black dark:text-white"
                    : "text-gray-500 dark:text-gray-300"
            )}
        >
            {label}
        </Link>
    );
};
