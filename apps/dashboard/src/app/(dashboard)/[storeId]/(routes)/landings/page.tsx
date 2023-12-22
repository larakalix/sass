import { LandingColumn } from "@/components/features/landing/columns/type";
import { LandingView } from "@/components/features/landing/view/landing-view";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function Page({
    params,
}: {
    params: { storeId: string };
}) {
    const { userId } = auth();
    if (!userId) redirect("/sign-in");

    const landings = await prismadb.landing.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const data: LandingColumn[] = landings.map(({ createdAt, ...props }) => ({
        ...props,
        createdAt: format(createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <LandingView data={data} />
            </div>
        </div>
    );
}
