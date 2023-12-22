"use client";

import { Children } from "react";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { BsGrid } from "react-icons/bs";
import { cn, generateId } from "@/lib/utils";
import { ElementSidebar } from "./sidebar/element-sidebar";
import { ElementWrapper } from "./element-wrapper";
import { formStore } from "../store/form-store";
import { type ElementsType, FormElements } from "../types/types";

export const Board = () => {
    const {
        elements,
        selectedElement,
        addElement,
        selectElement,
        removeElement,
    } = formStore((state) => state);
    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true,
        },
    });

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event;
            if (!active || !over) return;

            const isDesignerBtnElement =
                active.data?.current?.isDesignerBtnElement;
            const isDroppingOverDesignerDropArea =
                over.data?.current?.isDesignerDropArea;

            const droppingSidebarBtnOverDesignerDropArea =
                isDesignerBtnElement && isDroppingOverDesignerDropArea;

            // First scenario
            if (droppingSidebarBtnOverDesignerDropArea) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(
                    generateId()
                );

                addElement(elements.length, newElement);
                return;
            }

            const isDroppingOverDesignerElementTopHalf =
                over.data?.current?.isTopHalfDesignerElement;

            const isDroppingOverDesignerElementBottomHalf =
                over.data?.current?.isBottomHalfDesignerElement;

            const isDroppingOverDesignerElement =
                isDroppingOverDesignerElementTopHalf ||
                isDroppingOverDesignerElementBottomHalf;

            const droppingSidebarBtnOverDesignerElement =
                isDesignerBtnElement && isDroppingOverDesignerElement;

            // Second scenario
            if (droppingSidebarBtnOverDesignerElement) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(
                    generateId()
                );

                const overId = over.data?.current?.elementId;

                const overElementIndex = elements.findIndex(
                    (el) => el.id === overId
                );
                if (overElementIndex === -1) {
                    throw new Error("element not found");
                }

                let indexForNewElement = overElementIndex; // i assume i'm on top-half
                if (isDroppingOverDesignerElementBottomHalf) {
                    indexForNewElement = overElementIndex + 1;
                }

                addElement(indexForNewElement, newElement);
                return;
            }

            // Third scenario
            const isDraggingDesignerElement =
                active.data?.current?.isDesignerElement;

            const draggingDesignerElementOverAnotherDesignerElement =
                isDroppingOverDesignerElement && isDraggingDesignerElement;

            if (draggingDesignerElementOverAnotherDesignerElement) {
                const activeId = active.data?.current?.elementId;
                const overId = over.data?.current?.elementId;

                const activeElementIndex = elements.findIndex(
                    (el) => el.id === activeId
                );

                const overElementIndex = elements.findIndex(
                    (el) => el.id === overId
                );

                if (activeElementIndex === -1 || overElementIndex === -1) {
                    throw new Error("element not found");
                }

                const activeElement = { ...elements[activeElementIndex] };
                removeElement(activeId);

                let indexForNewElement = overElementIndex; // i assume i'm on top-half
                if (isDroppingOverDesignerElementBottomHalf) {
                    indexForNewElement = overElementIndex + 1;
                }

                addElement(indexForNewElement, activeElement);
            }
        },
    });

    return (
        <div className="flex w-full h-full gap-2">
            <div
                className="w-full"
                onClick={() => {
                    if (selectedElement) selectElement(null);
                }}
            >
                <div
                    ref={droppable.setNodeRef}
                    className={cn(
                        "bg-background max-w-[920px] h-full m-auto rounded-md flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto border border-dashed",
                        droppable.isOver && "border-green-500"
                    )}
                >
                    {!droppable.isOver && elements.length === 0 && (
                        <p className="text-xl text-muted-foreground flex flex-grow items-center justify-center flex-col gap-2">
                            <span className="text-3xl opacity-50">
                                <BsGrid />
                            </span>
                            <span>Drop here</span>
                        </p>
                    )}

                    {droppable.isOver && elements.length === 0 && (
                        <div className="p-4 w-full">
                            <div className="h-[120px] rounded-md border border-dashed border-green-500 bg-green-100 flex items-center justify-center">
                                <span className="text-green-500">
                                    Drop it here
                                </span>
                            </div>
                        </div>
                    )}
                    
                    {elements.length > 0 && (
                        <div className="flex flex-col  w-full gap-2 p-4">
                            {Children.toArray(
                                elements.map((element) => (
                                    <ElementWrapper element={element} />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            <ElementSidebar />
        </div>
    );
};
