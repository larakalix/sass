import { LandingForm } from "@/components/features/landing/form/landing-form";
import prismadb from "@/lib/prismadb";

export default async function Page({
    params: { landingId },
}: {
    params: { landingId: string };
}) {
    const landing =
        landingId === "new"
            ? null
            : await prismadb.landing.findUnique({
                  where: {
                      id: landingId,
                  },
              });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <LandingForm initialData={landing} />
            </div>
        </div>
    );
}
