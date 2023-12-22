import { Prisma } from "@prisma/client";

export type FormColumn = {
    id: string;
    name: string;
    description: string;
    content: Prisma.JsonValue;
    visits: number;
    shareLink: string;
    createdAt: string;
};
