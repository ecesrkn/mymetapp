import { create } from "zustand";

type GlobalStateType = {
    loadingCount: number,
    incrementLoadingCount: () => void,
    decrementLoadingCount: () => void,
}

export const useGlobalState = create<GlobalStateType>((set) => ({
    loadingCount: 0,
    incrementLoadingCount: () => set(state => ({ loadingCount: state.loadingCount + 1 })),
    decrementLoadingCount: () => set(state => ({ loadingCount: state.loadingCount - 1 })),
}))