import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { Department } from "../types/departments";

const DEPS_KEY = "DepartmentFavorites";
const OBJS_KEY = "ObjectFavorites";

type GlobalStateType = {
    loadingCount: number,
    incrementLoadingCount: () => void,
    decrementLoadingCount: () => void,
    departments: Department[],
    setDepartments: (value: Department[]) => void,
    favoriteDepartmentIds: number[],
    addFavoriteDepartment: (id: number) => Promise<void>;
    removeFavoriteDepartment: (id: number) => Promise<void>;
    loadFavoriteDepartments: () => Promise<void>;
    favoriteObjectIds: number[],
    addFavoriteObject: (id: number) => Promise<void>;
    removeFavoriteObject: (id: number) => Promise<void>;
    loadFavoriteObjects: () => Promise<void>;
}

export const useGlobalState = create<GlobalStateType>((set, get) => ({
    loadingCount: 0,
    incrementLoadingCount: () => set(state => ({ loadingCount: state.loadingCount + 1 })),
    decrementLoadingCount: () => set(state => ({ loadingCount: state.loadingCount - 1 })),
    departments: [],
    setDepartments: (value: Department[]) => set(({ departments: value })),
    favoriteDepartmentIds: [],
    addFavoriteDepartment: async (id: number) => {
        const current = get().favoriteDepartmentIds;
        if (current.includes(id)) return; // already present
        const newIds = [...current, id];
        try {
            await AsyncStorage.setItem(DEPS_KEY, JSON.stringify(newIds));
            set({ favoriteDepartmentIds: newIds });
        } catch (err) {
            console.error("Failed to add addFavoriteDepartment:", err);
        }
    },
    removeFavoriteDepartment: async (id: number) => {
        const current = get().favoriteDepartmentIds;
        if (!current.includes(id)) return;
        const newIds = current.filter((dId) => dId !== id);
        try {
            await AsyncStorage.setItem(DEPS_KEY, JSON.stringify(newIds));
            set({ favoriteDepartmentIds: newIds });
        } catch (err) {
            console.error("Failed to remove removeFavoriteDepartment:", err);
        }
    },
    loadFavoriteDepartments: async () => {
        try {
            const raw = await AsyncStorage.getItem(DEPS_KEY);
            if (raw) {
                const parsed: unknown = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    const nums = parsed.map((p) => Number(p)).filter((n) => !Number.isNaN(n));
                    set({ favoriteDepartmentIds: nums });
                }
            }
        } catch (err) {
            console.error("Failed to load favoriteDepartmentIds:", err);
        }
    },



    favoriteObjectIds: [],
    addFavoriteObject: async (id: number) => {
        const current = get().favoriteObjectIds;
        if (current.includes(id)) return; // already present
        const newIds = [...current, id];
        try {
            await AsyncStorage.setItem(OBJS_KEY, JSON.stringify(newIds));
            set({ favoriteObjectIds: newIds });
        } catch (err) {
            console.error("Failed to addFavoriteObject:", err);
        }
    },
    removeFavoriteObject: async (id: number) => {
        const current = get().favoriteObjectIds;
        if (!current.includes(id)) return;
        const newIds = current.filter((dId) => dId !== id);
        try {
            await AsyncStorage.setItem(OBJS_KEY, JSON.stringify(newIds));
            set({ favoriteObjectIds: newIds });
        } catch (err) {
            console.error("Failed to removeFavoriteObject:", err);
        }
    },
    loadFavoriteObjects: async () => {
        try {
            const raw = await AsyncStorage.getItem(OBJS_KEY);
            if (raw) {
                const parsed: unknown = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    const nums = parsed.map((p) => Number(p)).filter((n) => !Number.isNaN(n));
                    set({ favoriteObjectIds: nums });
                }
            }
        } catch (err) {
            console.error("Failed to load favoriteObjectIds:", err);
        }
    }
}))