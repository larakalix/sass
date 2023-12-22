import { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";

export const DragOverlayWrapper = () => {
    // const elements = landingStore((state) => state.elements);
    const [draggedItem, setDraggedItem] = useState<Active | null>(null);

    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        },
    });

    if (!draggedItem) return null;

    let node = <div>No drag overlay</div>;

    return <DragOverlay>{node}</DragOverlay>;
};
