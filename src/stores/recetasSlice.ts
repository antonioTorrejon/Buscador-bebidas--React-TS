import { StateCreator } from "zustand"
import { getCategorias, getRecetaPorId, getRecetas } from "../servicios/ServicioRecetas"
import type { Bebida, Bebidas, Categorias, FiltroBuscador, Receta } from "../types"

export type RecetasSliceType = {
    categorias: Categorias
    bebidas: Bebidas
    recetaElegida: Receta
    modal: boolean
    fetchCategorias: () => Promise<void>
    buscarRecetas: (filtroBusquedas: FiltroBuscador) => Promise<void>
    recetaSeleccionada: (id: Bebida['idDrink']) => Promise<void>
    closeModal: () => void
}

export const crearRecetasSlice : StateCreator<RecetasSliceType> = (set) => ({
    categorias: {
        drinks: []
    },
    bebidas: {
        drinks: []
    },
    recetaElegida: {} as Receta,
    modal: false,
    fetchCategorias: async () => {
        const categorias = await getCategorias()
        
        set({
            categorias
        })
    },

    buscarRecetas : async (filtros) => {
        const bebidas = await getRecetas(filtros)
        set({
            bebidas
        })
    },

    recetaSeleccionada: async (id) => {
        const recetaElegida = await getRecetaPorId(id)
        set({
            recetaElegida,
            modal: true
        })
    },

    closeModal: () => {
        set({
            modal: false,
            recetaElegida: {} as Receta
        })
    }

})