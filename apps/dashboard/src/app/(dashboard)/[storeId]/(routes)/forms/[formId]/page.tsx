import prismadb from "@/lib/prismadb";
import { FormForm } from "@/components/features/form/form/form-form";

export default async function Page({
    params: { formId },
}: {
    params: { formId: string };
}) {
    const form =
        formId === "new"
            ? null
            : await prismadb.form.findUnique({
                  where: {
                      id: formId,
                  },
              });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <FormForm initialData={form} />
            </div>
        </div>
    );
}
