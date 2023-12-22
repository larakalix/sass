import { AiOutlineClose } from "react-icons/ai";
import { Elements } from "./elements";
import { Button } from "@/components/ui/button";
import { formStore } from "../store/form-store";

export const SelectedElementForm = () => {
    const { selectedElement, selectElement } = formStore((state) => state);

    if (!selectedElement) return null;

    const PropertiesForm = Elements[selectedElement.type].propertiesComponent;

    return (
        <div className="flex flex-col p-2">
            <div className="flex justify-between items-center">
                <p className="text-sm text-muted">Properties</p>

                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                        selectElement(null);
                    }}
                >
                    <AiOutlineClose />
                </Button>
            </div>

            <PropertiesForm instance={selectedElement} />
        </div>
    );
};
