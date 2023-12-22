import { ProductForm } from "@/components/features/product/form/product-form";
import prismadb from "@/lib/prismadb";

export default async function Page({
    params: { productId, storeId },
}: {
    params: { productId: string; storeId: string };
}) {
    const product =
        productId === "new"
            ? null
            : await prismadb.product.findUnique({
                  where: {
                      id: productId,
                  },
                  include: {
                      images: true,
                  },
              });

    const categories = await prismadb.category.findMany({
        where: {
            storeId: storeId,
        },
    });

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: storeId,
        },
    });

    const colors = await prismadb.color.findMany({
        where: {
            storeId: storeId,
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                    initialData={product}
                />
            </div>
        </div>
    );
}
