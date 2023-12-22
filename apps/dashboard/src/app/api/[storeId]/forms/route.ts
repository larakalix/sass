import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, description, content } = body;

        if (!userId)
            return new NextResponse("Unauthenticated", { status: 403 });
        if (!name) return new NextResponse("Name is required", { status: 400 });
        if (!params.storeId)
            return new NextResponse("Store id is required", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: { id: params.storeId, userId },
        });

        if (!storeByUserId)
            return new NextResponse("Unauthorized", { status: 405 });

        const form = await prismadb.form.create({
            data: { name, description, content, storeId: params.storeId },
        });

        return NextResponse.json(form);
    } catch (error) {
        console.log("[FORMS_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        if (!params.storeId)
            return new NextResponse("Store id is required", { status: 400 });

        const forms = await prismadb.form.findMany({
            where: { storeId: params.storeId },
        });

        return NextResponse.json(forms);
    } catch (error) {
        console.log("[FORMS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
