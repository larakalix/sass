import { create } from "zustand";
import type { FormElementInstance } from "../types/types";

export type FormStoreProps = {
    elements: FormElementInstance[];
    selectedElement: FormElementInstance | null;
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;
    updateElement: (id: string, element: FormElementInstance) => void;
    selectElement: (selectedElement: FormElementInstance | null) => void;
    setElements: (elements: FormElementInstance[]) => void;
};

export const formStore = create<FormStoreProps>((set, get) => ({
    elements: [],
    selectedElement: null,
    addElement: (_, element) => {
        set((state) => ({
            elements: [...state.elements, element],
        }));
    },
    updateElement: (id, element) => {
        const prev = get().elements;
        const index = prev.findIndex((e) => e.id === id);

        prev[index] = element;

        set((state) => ({
            elements: prev,
        }));
    },
    removeElement: (id) => {
        const selectedElement = get().selectedElement;

        set((state) => ({
            elements: [...state.elements.filter((e) => e.id !== id)],
            selectedElement:
                selectedElement && selectedElement.id === id
                    ? null
                    : state.selectedElement,
        }));
    },
    selectElement: (selectedElement) => {
        set((state) => ({ selectedElement }));
    },
    setElements: (elements) => {
        set({ elements });
    },
}));
