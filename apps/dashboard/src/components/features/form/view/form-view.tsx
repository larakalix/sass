"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { FormColumn } from "../columns/type";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { formColumns } from "../columns/form-columns";

type Props = {
    data: FormColumn[];
};

export const FormView = ({ data }: Props) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Forms (${data.length})`}
                    description="Manage Forms for your store"
                />

                <Button
                    onClick={() => router.push(`/${params.storeId}/forms/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={formColumns} data={data} />
            <Heading title="API" description="API Calls for Forms" />
            <Separator />
            <ApiList entityName="forms" entityIdName="formId" />
        </>
    );
};
