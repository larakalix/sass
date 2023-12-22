import { FormColumn } from "@/components/features/form/columns/type";
import { FormView } from "@/components/features/form/view/form-view";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function Page({
    params,
}: {
    params: { storeId: string };
}) {
    const { userId } = auth();
    if (!userId) redirect("/sign-in");

    const forms = await prismadb.form.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const data: FormColumn[] = forms.map(({ createdAt, ...props }) => ({
        ...props,
        createdAt: format(createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <FormView data={data} />
            </div>
        </div>
    );
}
