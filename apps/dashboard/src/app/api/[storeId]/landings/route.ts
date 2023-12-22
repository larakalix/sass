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

        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!name) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const landing = await prismadb.landing.create({
            data: {
                name,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(landing);
    } catch (error) {
        console.log("[LANDING_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { searchParams } = new URL(req.url);

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const landings = await prismadb.landing.findMany({
            where: {
                storeId: params.storeId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(landings);
    } catch (error) {
        console.log("[LANDING_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
