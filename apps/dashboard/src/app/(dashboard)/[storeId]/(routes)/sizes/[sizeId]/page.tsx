import { SizeForm } from "@/components/features/size/form/size-form";
import prismadb from "@/lib/prismadb";

export default async function Page({
    params: { sizeId },
}: {
    params: { sizeId: string };
}) {
    const size =
        sizeId === "new"
            ? null
            : await prismadb.size.findUnique({
                  where: {
                      id: sizeId,
                  },
              });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={size} />
            </div>
        </div>
    );
}
