import { CategoryForm } from "@/components/features/category/form/category-form";
import prismadb from "@/lib/prismadb";

export default async function Page({
    params: { categoryId, storeId },
}: {
    params: { categoryId: string; storeId: string };
}) {
    const category =
        categoryId === "new"
            ? null
            : await prismadb.category.findUnique({
                  where: {
                      id: categoryId,
                  },
              });

    const images = await prismadb.billboard.findMany({
        where: {
            storeId: storeId,
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm images={images} initialData={category} />
            </div>
        </div>
    );
}
