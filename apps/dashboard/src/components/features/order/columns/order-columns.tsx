"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { OrderColumn } from "../type/types";

export const orderColumns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "totalPrice",
        header: "Total price",
    },
    {
        accessorKey: "isPaid",
        header: "Paid",
    },
];
