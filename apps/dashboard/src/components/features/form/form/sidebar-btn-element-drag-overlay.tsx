import { Button } from "@/components/ui/button";
import { FormElement } from "../types/types";

export function SidebarBtnElementDragOverlay({
    formElement,
}: {
    formElement: FormElement;
}) {
    const { label, icon: Icon } = formElement.designerBtnElement;

    return (
        <Button
            variant={"outline"}
            className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"
        >
            <Icon className="h-8 w-8 text-primary cursor-grab" />
            <p className="text-xs">{label}</p>
        </Button>
    );
}
