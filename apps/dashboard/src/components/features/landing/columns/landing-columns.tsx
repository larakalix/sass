"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LandingColumn } from "./type";
import { CellAction } from "../cell-action";

export const landingColumns: ColumnDef<LandingColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
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
