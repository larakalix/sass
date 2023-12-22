import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { landingId: string } }
) {
    try {
        if (!params.landingId) {
            return new NextResponse("Landing id is required", { status: 400 });
        }

        const landing = await prismadb.landing.findUnique({
            where: {
                id: params.landingId,
            },
        });

        return NextResponse.json(landing);
    } catch (error) {
        console.log("[LANDING_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { landingId: string; storeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId)
            return new NextResponse("Unauthenticated", { status: 403 });
        if (!params.landingId)
            return new NextResponse("Landing id is required", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId)
            return new NextResponse("Unauthorized", { status: 405 });

        const landing = await prismadb.landing.delete({
            where: {
                id: params.landingId,
            },
        });

        return NextResponse.json(landing);
    } catch (error) {
        console.log("[LANDING_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { landingId: string; storeId: string } }
) {
    try {
        const { userId } = auth();

        const body = await req.json();

        const { name } = body;

        if (!userId)
            return new NextResponse("Unauthenticated", { status: 403 });
        if (!params.landingId)
            return new NextResponse("Landing id is required", { status: 400 });
        if (!name) return new NextResponse("Name is required", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId)
            return new NextResponse("Unauthorized", { status: 405 });

        await prismadb.landing.update({
            where: {
                id: params.landingId,
            },
            data: {
                name,
            },
        });

        const landing = await prismadb.landing.update({
            where: {
                id: params.landingId,
            },
            data: {
                name,
            },
        });

        return NextResponse.json(landing);
    } catch (error) {
        console.log("[LANDING_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
