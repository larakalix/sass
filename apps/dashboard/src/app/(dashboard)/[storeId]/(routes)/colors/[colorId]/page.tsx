import { ColorForm } from "@/components/features/color/form/color-form";
import prismadb from "@/lib/prismadb";

export default async function Page({
    params: { colorId },
}: {
    params: { colorId: string };
}) {
    const color =
        colorId === "new"
            ? null
            : await prismadb.color.findUnique({
                  where: {
                      id: colorId,
                  },
              });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorForm initialData={color} />
            </div>
        </div>
    );
}
