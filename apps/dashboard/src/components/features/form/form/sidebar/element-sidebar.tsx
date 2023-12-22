import React from "react";
import { formStore } from "../../store/form-store";
import { FormElementsSidebar } from "./form-elements-sidebar";
import { PropertiesFormSidebar } from "./properties-form-sidebar";

export const ElementSidebar = () => {
    const { selectedElement } = formStore((state) => state);

    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 rounded-md border p-4 bg-background overflow-y-auto h-full">
            {!selectedElement && <FormElementsSidebar />}
            {selectedElement && <PropertiesFormSidebar />}
        </aside>
    );
};
