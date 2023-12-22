import type { CategoryColumn } from "@/components/features/category/columns/type";
import { CategoryView } from "@/components/features/category/view/category-view";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

export default async function Page({
    params,
}: {
    params: { storeId: string };
}) {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            billboard: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const data: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryView data={data} />
            </div>
        </div>
    );
}
