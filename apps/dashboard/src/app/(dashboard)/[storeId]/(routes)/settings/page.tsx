import { SettingsForm } from "@/components/core/forms/settings-form";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function Page({
    params,
}: {
    params: {
        storeId: string;
    };
}) {
    const { userId } = auth();
    if (!userId) redirect("/sign-in");

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        },
    });

    if (!store) redirect("/");

    console.log("store", store);

    return (
        <div className="flex-col">
            <div className="flex-1 gap-4 p-4 pt-6">
                <SettingsForm data={store} />
            </div>
        </div>
    );
}
