import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { formId: string } }
) {
    try {
        if (!params.formId)
            return new NextResponse("Form id is required", { status: 400 });

        const form = await prismadb.form.findUnique({
            where: { id: params.formId },
        });

        return NextResponse.json(form);
    } catch (error) {
        console.log("[FORMGET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { formId: string; storeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId)
            return new NextResponse("Unauthenticated", { status: 403 });
        if (!params.formId)
            return new NextResponse("Form id is required", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: { id: params.storeId, userId },
        });

        if (!storeByUserId)
            return new NextResponse("Unauthorized", { status: 405 });

        const form = await prismadb.color.delete({
            where: { id: params.formId },
        });

        return NextResponse.json(form);
    } catch (error) {
        console.log("[FORM_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { formId: string; storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, description, content } = body;

        if (!userId)
            return new NextResponse("Unauthenticated", { status: 403 });
        if (!name) return new NextResponse("Name is required", { status: 400 });
        if (!params.formId)
            return new NextResponse("Form id is required", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: { id: params.storeId, userId },
        });

        if (!storeByUserId)
            return new NextResponse("Unauthorized", { status: 405 });

        const form = await prismadb.form.update({
            where: { id: params.formId },
            data: { name, description, content },
        });

        return NextResponse.json(form);
    } catch (error) {
        console.log("[FORM_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
