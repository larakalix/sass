"use client";

import * as z from "zod";

import { useParams, useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { AlertModal } from "@/components/core/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Landing } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { Input } from "@/components/ui/input";
import { Board } from "./board";
import { DragOverlayWrapper } from "./overlay-wrapper";

const landingSchema = z.object({
    name: z.string().min(1),
});

type LandingFormValues = z.infer<typeof landingSchema>;

type Props = {
    initialData: Landing | null;
};

export const LandingForm = ({ initialData }: Props) => {
    const params = useParams();
    const router = useRouter();

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

    const title = initialData ? "Edit landing" : "Create landing";
    const description = initialData ? "Edit a landing." : "Add a new landing";
    const toastMessage = initialData ? "Landing updated." : "Landing created.";
    const action = initialData ? "Save changes" : "Create";

    const defaultValues = initialData
        ? {
              ...initialData,
          }
        : {
              name: "",
          };

    const form = useForm<LandingFormValues>({
        resolver: zodResolver(landingSchema),
        defaultValues,
    });

    const onSubmit = async (data: LandingFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/landings/${params.productId}`,
                    data
                );
            } else {
                await axios.post(`/api/${params.storeId}/landings`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/landings`);
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
                `/api/${params.storeId}/landings/${params.productId}`
            );
            router.refresh();
            router.push(`/${params.storeId}/landings`);
            toast.success("Landing deleted.");
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

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
                                                placeholder="Landing name"
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
                        </ul>

                        <Board />

                        <DragOverlayWrapper />
                    </form>
                </Form>
            </DndContext>
        </>
    );
};
