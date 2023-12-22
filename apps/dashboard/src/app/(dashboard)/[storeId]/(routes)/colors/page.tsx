import type { ColorColumn } from "@/components/features/color/columns/type";
import { ColorView } from "@/components/features/color/view/color-view";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

export default async function Page({
    params,
}: {
    params: { storeId: string };
}) {
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const data: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorView data={data} />
            </div>
        </div>
    );
}
