"use client";

import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal/modal";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useModalStore } from "@/components/ui/modal/hooks/use-modal";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(3).max(255),
});

type FormValues = z.infer<typeof schema>;

export const StoreModal = () => {
    const [loading, setLoading] = useState(false);
    const { isOpen, onClose } = useModalStore();

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            const { data } = await axios.post("/api/stores", values);
            toast.success("Store created successfully");
            form.reset();

            if (data.id) {
                window.location.assign(`/${data.id}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Create Store"
            description="Add a new store branch"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="py-2 pb-4 space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Store name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <footer className="pt-6 flex items-center justify-end gap-2">
                            <Button
                                disabled={loading}
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button disabled={loading} type="submit">
                                Save
                            </Button>
                        </footer>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};
