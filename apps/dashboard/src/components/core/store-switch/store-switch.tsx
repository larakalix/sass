"use client";

import { BiCheck, BiChevronDown, BiPlus, BiStore } from "react-icons/bi";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import React, { Children } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Store } from "@prisma/client";
import { cn } from "@/lib/utils";
import { set } from "date-fns";
import { useModalStore } from "@/components/ui/modal/hooks/use-modal";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
    typeof PopoverTrigger
>;
type Props = PopoverTriggerProps & {
    items: Store[];
};

export const StoreSwitch = ({ className, items = [] }: Props) => {
    const [open, setOpen] = React.useState(false);
    const { isOpen, onClose, onOpen } = useModalStore();
    const params = useParams();
    const router = useRouter();

    const itemsWithFormat = items.map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    const currentStore = itemsWithFormat.find(
        (item) => item.value === params.storeId
    );

    const onSelect = (store: { value: string; label: string }) => {
        setOpen(false);
        router.push(`/${store.value}`);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <BiStore className="mr-2 h-4 w-4" />
                    {currentStore?.label || "Select a store"}
                    <BiChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Select a store" />
                        <CommandGroup heading="Stores">
                            {Children.toArray(
                                itemsWithFormat.map((item) => (
                                    <CommandItem
                                        onSelect={() => onSelect(item)}
                                    >
                                        {item.label}
                                        <BiCheck
                                            className={cn(
                                                "ml-auto h-4 w-4 shrink-0",
                                                currentStore?.value ===
                                                    item.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))
                            )}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                className="font-medium"
                                onSelect={() => {
                                    setOpen(false);
                                    onOpen();
                                }}
                            >
                                <BiPlus className="mr-2 h-4 w-4" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
