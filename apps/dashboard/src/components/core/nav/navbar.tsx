import { UserButton, auth } from "@clerk/nextjs";

import React from "react";
import { Routes } from "./childs/routes";
import { StoreSwitch } from "../store-switch/store-switch";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export const Navbar = async () => {
    const { userId } = auth();

    if (!userId) redirect("/sign-in");

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });

    return (
        <header className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitch items={stores} />
                <Routes className="mx-6" />
                <div className="ml-auto flex items-center gap-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </header>
    );
};
