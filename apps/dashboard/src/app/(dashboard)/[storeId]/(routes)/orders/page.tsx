import type { OrderColumn } from "@/components/features/order/type/types";
import { OrderView } from "@/components/features/order/view/order-view";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import prismadb from "@/lib/prismadb";

export default async function Page({
    params,
}: {
    params: { storeId: string };
}) {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const data: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems
            .map((orderItem) => orderItem.product.name)
            .join(", "),
        totalPrice: formatter.format(
            item.orderItems.reduce((total, item) => {
                return total + Number(item.product.price);
            }, 0)
        ),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderView data={data} />
            </div>
        </div>
    );
}
