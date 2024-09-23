import { create } from "zustand";
import { crearRecetasSlice, RecetasSliceType } from "./recetasSlice";
import { devtools } from "zustand/middleware";
import { FavoritosSliceType, crearFavoritosSlice } from "./favoritosSlice";
import { NotificacionSlice, crearNotificacionSlice } from "./notificacionSlice";

export const useAppStore = create<RecetasSliceType & FavoritosSliceType & NotificacionSlice>()(devtools((...a) => ({
    ...crearRecetasSlice(...a),
    ...crearFavoritosSlice(...a),
    ...crearNotificacionSlice(...a)
})))