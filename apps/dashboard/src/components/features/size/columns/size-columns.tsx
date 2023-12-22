"use client";

import { CellAction } from "../cell-action";
import { ColumnDef } from "@tanstack/react-table";
import type { SizeColumn } from "./type";

export const sizeColumns: ColumnDef<SizeColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
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
