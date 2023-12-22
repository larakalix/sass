"use client";

import { useParams, useRouter } from "next/navigation";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import type { ImageColumn } from "../columns/type";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { imageColumns } from "../columns/image-columns";

interface Props {
    data: ImageColumn[];
}

export const ImageView = ({ data }: Props) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Images (${data.length})`}
                    description="Manage images for your store"
                />
                <Button
                    onClick={() =>
                        router.push(`/${params.storeId}/images/new`)
                    }
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="label" columns={imageColumns} data={data} />
            <Heading title="API" description="API Calls for Billboards" />
            <Separator />
            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    );
};
