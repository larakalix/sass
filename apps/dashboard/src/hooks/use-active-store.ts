import { create } from "zustand";

type useActiveStoreInterface = {
    id?: string;
    set: (id: string) => void;
    reset: () => void;
};

export const useActiveStore = create<useActiveStoreInterface>((set) => ({
    id: undefined,
    set: (id: string) => set({ id }),
    reset: () => set({ id: undefined }),
}));
