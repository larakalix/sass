import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth();

    if (!userId) redirect("/sign-in");

    const store = await prismadb.store.findFirst({
        where: {
            userId: userId!,
        },
    });

    console.log("STORE", store);

    if (store) return redirect(`/${store.id}`);

    return <>{children}</>;
}
