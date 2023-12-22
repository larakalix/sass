import type { ImageColumn } from "@/components/features/image/columns/type";
import { ImageView } from "@/components/features/image/view/image-view";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

export default async function Page({
    params,
}: {
    params: { storeId: string };
}) {
    const images = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const data: ImageColumn[] = images.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ImageView data={data} />
            </div>
        </div>
    );
}
