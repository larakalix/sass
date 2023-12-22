import { ImageForm } from "@/components/features/image/form/image-form";
import prismadb from "@/lib/prismadb";

export default async function Page({
    params: { imageId },
}: {
    params: { imageId: string };
}) {
    const billboard =
        imageId === "new"
            ? null
            : await prismadb.billboard.findUnique({
                  where: {
                      id: imageId,
                  },
              });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ImageForm initialData={billboard} />
            </div>
        </div>
    );
}
