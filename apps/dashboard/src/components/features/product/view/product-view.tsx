"use client";

import { useParams, useRouter } from "next/navigation";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import type { ProductColumn } from "../columns/type";
import { Separator } from "@/components/ui/separator";
import { productColumns } from "../columns/product-column";

type Props = {
    data: ProductColumn[];
};

export const ProductView = ({ data }: Props) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products (${data.length})`}
                    description="Manage products for your store"
                />
                <Button
                    onClick={() =>
                        router.push(`/${params.storeId}/products/new`)
                    }
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={productColumns} data={data} />
            <Heading title="API" description="API Calls for Products" />
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </>
    );
};
