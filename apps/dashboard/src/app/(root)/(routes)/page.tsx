"use client";

import { useEffect } from "react";
import { useModalStore } from "@/components/ui/modal/hooks/use-modal";

export default function Home() {
    const { isOpen, onClose, onOpen } = useModalStore((state) => state);

    useEffect(() => {
        if (!isOpen) onOpen();
    }, [isOpen, onOpen]);

    return null;
}
