import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { Navbar } from "@/components/core/nav/navbar";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {
        storeId: string;
    };
}) {
    const { userId } = auth();

    if (!userId) redirect("/sign-in");

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId!,
        },
    });

    if (!store) return redirect("/");

    return (
        <>
            <Navbar />

            {children}
        </>
    );
}
