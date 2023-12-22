"use client";

import { useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formStore } from "../store/form-store";
import { FormElementInstance, FormElements } from "../types/types";
import { BiSolidTrash } from "react-icons/bi";

export const ElementWrapper = ({
    element,
}: {
    element: FormElementInstance;
}) => {
    const { removeElement, selectElement } = formStore((state) => state);
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
    const topHalf = useDroppable({
        id: element.id + "-top",
        data: {
            type: element.type,
            elementId: element.id,
            isTopHalfDesignerElement: true,
        },
    });

    const bottomHalf = useDroppable({
        id: element.id + "-bottom",
        data: {
            type: element.type,
            elementId: element.id,
            isBottomHalfDesignerElement: true,
        },
    });

    const draggable = useDraggable({
        id: element.id + "-drag-handler",
        data: {
            type: element.type,
            elementId: element.id,
            isDesignerElement: true,
        },
    });

    if (draggable.isDragging) return null; // temporary remove the element from designer

    const DesignerElement = FormElements[element.type].designerComponent;

    return (
        <figure
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
            onClick={(e) => {
                e.stopPropagation();
                selectElement(element);
            }}
        >
            <div
                ref={topHalf.setNodeRef}
                className="absolute w-full h-1/2 rounded-t-md"
            />
            <div
                ref={bottomHalf.setNodeRef}
                className="absolute  w-full bottom-0 h-1/2 rounded-b-md"
            />
            {mouseIsOver && (
                <>
                    <div className="absolute right-0 h-full">
                        <Button
                            className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500 hover:bg-red-700 px-4 hover:px-8 transition-all"
                            variant={"outline"}
                            onClick={(e) => {
                                e.stopPropagation(); // avoid selection of element while deleting
                                removeElement(element.id);
                            }}
                        >
                            <BiSolidTrash className="h-6 w-6 text-white" />
                        </Button>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                        <p className="text-muted-foreground text-sm">
                            Click for properties or drag to move
                        </p>
                    </div>
                </>
            )}
            {topHalf.isOver && (
                <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
            )}
            <div
                className={cn(
                    "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
                    mouseIsOver && "opacity-30"
                )}
            >
                <DesignerElement elementInstance={element} />
            </div>
            {bottomHalf.isOver && (
                <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
            )}
        </figure>
    );
};
