import { StateCreator } from "zustand";
import { FavoritosSliceType } from "./favoritosSlice";

type Notificacion = {
    text: string
    error: boolean
    show: boolean
}

export type NotificacionSlice = {
    notificacion: Notificacion
    showNotificacion: (payload: Pick<Notificacion, 'text' | 'error'>) => void
    hideNotificacion: () => void
}

export const crearNotificacionSlice: StateCreator<NotificacionSlice & FavoritosSliceType, [], [], 
NotificacionSlice> = (set, get) => ({
    notificacion: {
        text: '',
        error: false,
        show: false
    },

    showNotificacion: (payload) => {
        set({
            notificacion: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            get().hideNotificacion()
        }, 3000);
    },

    hideNotificacion : () => {
        set({
            notificacion: {
                text: '',
                error: false,
                show: false
            },  
        })
    }
})