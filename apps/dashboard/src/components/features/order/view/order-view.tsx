"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import type { OrderColumn } from "../type/types";
import { Separator } from "@/components/ui/separator";
import { orderColumns } from "../columns/order-columns";

type Props = {
    data: OrderColumn[];
};

export const OrderView = ({ data }: Props) => {
    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage orders for your store"
            />
            <Separator />
            <DataTable
                searchKey="products"
                columns={orderColumns}
                data={data}
            />
        </>
    );
};
