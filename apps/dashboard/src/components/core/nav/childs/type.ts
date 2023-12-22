export type Route = {
    href: string;
    label: string;
    active: boolean;
    childs?: Route[];
};
