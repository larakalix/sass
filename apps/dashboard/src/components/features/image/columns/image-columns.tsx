"use client";

import { CellAction } from "../cell-action";
import { ColumnDef } from "@tanstack/react-table";
import type { ImageColumn } from "./type";

export const imageColumns: ColumnDef<ImageColumn>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
