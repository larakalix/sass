"use client";

import { Children } from "react";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { BsGrid } from "react-icons/bs";
import { cn } from "@/lib/utils";

export const Board = () => {
    // const {
    //     elements,
    //     selectedElement,
    //     addElement,
    //     selectElement,
    //     removeElement,
    // } = landingStore((state) => state);
    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true,
        },
    });

    return (
        <div className="flex w-full h-full gap-2">
            <div
                className="w-full"
                onClick={() => {
                    // if (selectedElement) selectElement(null);
                }}
            >
                <div
                    ref={droppable.setNodeRef}
                    className={cn(
                        "bg-background max-w-[920px] h-full m-auto rounded-md flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto border border-dashed",
                        droppable.isOver && "border-green-500"
                    )}
                >
                    {/* {!droppable.isOver && elements.length === 0 && (
                        <p className="text-xl text-muted-foreground flex flex-grow items-center justify-center flex-col gap-2">
                            <span className="text-3xl opacity-50">
                                <BsGrid />
                            </span>
                            <span>Drop here</span>
                        </p>
                    )} */}

                    {/* {droppable.isOver && elements.length === 0 && (
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
                    )} */}
                </div>
            </div>

            {/* <ElementSidebar /> */}
        </div>
    );
};
