"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";
import { CellAction } from "../cell-action";
import type { FormColumn } from "./type";

export const formColumns: ColumnDef<FormColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => row.original.description,
    },
    {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => (
            <div className="w-full h-full flex items-center justify-center">
                {row.original.content && row.original.content !== "[]" ? (
                    <span className="text-green-500 text-lg">
                        <BsCheckCircleFill />
                    </span>
                ) : (
                    <span className="text-gray-400 text-lg">
                        <BsCheckCircle />
                    </span>
                )}
            </div>
        ),
    },
    {
        accessorKey: "shareLink",
        header: "Share Link",
        cell: ({ row }) => row.original.shareLink,
    },
    {
        accessorKey: "visits",
        header: "Visits",
        cell: ({ row }) => row.original.visits,
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
