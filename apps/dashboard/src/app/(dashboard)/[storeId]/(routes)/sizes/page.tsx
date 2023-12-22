import type { SizeColumn } from "@/components/features/size/columns/type";
import { SizeView } from "@/components/features/size/view/size-view";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

export default async function Page({
    params,
}: {
    params: { storeId: string };
}) {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeView data={formattedSizes} />
            </div>
        </div>
    );
}
