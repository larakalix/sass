import type { ProductColumn } from "@/components/features/product/columns/type";
import { ProductView } from "@/components/features/product/view/product-view";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
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

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const data: ProductColumn[] = products.map(
        ({ createdAt, color, size, category, price, ...props }) => ({
            ...props,
            price: formatter.format(price.toNumber()),
            category: category.name,
            size: size.name,
            color: color.value,
            createdAt: format(createdAt, "MMMM do, yyyy"),
        })
    );

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductView data={data} />
            </div>
        </div>
    );
}
