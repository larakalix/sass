"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { LandingColumn } from "../columns/type";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { landingColumns } from "../columns/landing-columns";

type Props = {
    data: LandingColumn[];
};

export const LandingView = ({ data }: Props) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Landings (${data.length})`}
                    description="Manage landings for your store"
                />

                <Button
                    onClick={() =>
                        router.push(`/${params.storeId}/landings/new`)
                    }
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={landingColumns} data={data} />
            <Heading title="API" description="API Calls for Landings" />
            <Separator />
            <ApiList entityName="landings" entityIdName="landingId" />
        </>
    );
};
