import { StateCreator } from "zustand";
import { Receta } from "../types";
import { crearNotificacionSlice, NotificacionSlice } from "./notificacionSlice";
import { RecetasSliceType } from "./recetasSlice";

export type FavoritosSliceType = {
    favoritos: Receta[]
    handleClickFavorito: (receta: Receta) => void
    existeFavorito: (id: Receta['idDrink']) => boolean
    loadFromStorage: () => any
}

export const crearFavoritosSlice: StateCreator<FavoritosSliceType & RecetasSliceType & NotificacionSlice, 
[], [], FavoritosSliceType> = (set, get, api) => ({
    favoritos: [],

    handleClickFavorito: (receta) => {
        if(get().existeFavorito(receta.idDrink)) {
            set((state) => ({
                favoritos: state.favoritos.filter( favorito => favorito.idDrink !== receta.idDrink)
            }))
            crearNotificacionSlice(set, get, api).showNotificacion({
                text: 'Se eliminó correctamente de favoritos', 
                error: false, 
            })
        } else {
            set((state) => ({
                favoritos: [...state.favoritos, receta]
            }))
            crearNotificacionSlice(set, get, api).showNotificacion({
                text: 'Se agregó correctamente a favoritos', 
                error: false
            })
        }
        localStorage.setItem('favoritos', JSON.stringify(get().favoritos))
    }, 

    existeFavorito: (id) => {
        return get().favoritos.some(favorito => favorito.idDrink === id)
    }, 

    loadFromStorage: () => {
        const storedFavoritos = localStorage.getItem('favoritos')
        if(storedFavoritos) {
            set({
                favoritos: JSON.parse(storedFavoritos)
            })
        }
    }
})