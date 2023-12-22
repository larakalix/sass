import { Button } from "@/components/ui/button";
import { formStore } from "../../store/form-store";
import { Separator } from "@/components/ui/separator";
import { AiOutlineClose } from "react-icons/ai";
import { FormElements } from "../../types/types";

export const PropertiesFormSidebar = () => {
    const { selectedElement, selectElement } = formStore((state) => state);
    if (!selectedElement) return null;

    const PropertiesForm =
        FormElements[selectedElement?.type].propertiesComponent;

    return (
        <div className="flex flex-col p-2">
            <div className="flex justify-between items-center">
                <p className="text-sm text-foreground/70">Element properties</p>
                <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => {
                        selectElement(null);
                    }}
                >
                    <AiOutlineClose />
                </Button>
            </div>
            <Separator className="mb-4" />
            <PropertiesForm elementInstance={selectedElement} />
        </div>
    );
};
