"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import * as z from "zod";
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/core/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Prisma, Form as TForm } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Board } from "./board";
import { DragOverlayWrapper } from "./overlay-wrapper";
import { PreviewDialog } from "./preview-dialog";
import { formStore } from "../store/form-store";
import { FormElementInstance } from "../types/types";

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
});

const moduleName = "forms";

type FormFormValues = z.infer<typeof formSchema>;

type Props = {
    initialData: TForm | null;
};

export const FormForm = ({ initialData }: Props) => {
    const params = useParams();
    const router = useRouter();
    const { elements, setElements, selectElement } = formStore(
        (state) => state
    );

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 5,
        },
    });
    const sensors = useSensors(mouseSensor, touchSensor);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit form" : "Create form";
    const description = initialData ? "Edit a form." : "Add a new form";
    const toastMessage = initialData ? "Form updated." : "Form created.";
    const action = initialData ? "Save changes" : "Create";

    const defaultValues = initialData
        ? {
              ...initialData,
          }
        : {
              name: "",
          };

    const form = useForm<FormFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (data: FormFormValues) => {
        try {
            setLoading(true);
            const validation = formSchema.safeParse(data);
            if (!validation.success) toast.error("Something went wrong.");

            const content = JSON.stringify(elements);

            console.log("Form submit");
            console.log({
                ...data,
                content,
            });
            console.log("Form submit");

            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/${moduleName}/${params.formId}`,
                    {
                        ...data,
                        content,
                    }
                );
            } else {
                await axios.post(`/api/${params.storeId}/${moduleName}`, {
                    ...data,
                    content,
                });
            }
            router.refresh();
            router.push(`/${params.storeId}/${moduleName}`);
            toast.success(toastMessage);
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(
                `/api/${params.storeId}/${moduleName}/${params.formId}`
            );
            router.refresh();
            router.push(`/${params.storeId}/${moduleName}`);
            toast.success("Product deleted.");
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    useEffect(() => {
        if (initialData && initialData.content) {
            const content = JSON.parse(
                JSON.stringify(initialData.content as Prisma.JsonArray)
            );

            if (Array.isArray(JSON.parse(content)))
                setElements(JSON.parse(content) as FormElementInstance[]);
        }

        return () => {
            setElements([]);
            selectElement(null);
        };
    }, [initialData, selectElement, setElements]);

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <Separator />

            <DndContext sensors={sensors}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 w-full"
                    >
                        <div className="md:grid md:grid-cols-3 gap-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Form name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Form description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <ul className="flex items-center gap-2">
                            <li>
                                <Button
                                    disabled={loading}
                                    className="ml-auto"
                                    type="submit"
                                >
                                    {action}
                                </Button>
                            </li>
                            <li>
                                <PreviewDialog />
                            </li>
                        </ul>

                        <Board />

                        <DragOverlayWrapper />
                    </form>
                </Form>
            </DndContext>
        </>
    );
};
