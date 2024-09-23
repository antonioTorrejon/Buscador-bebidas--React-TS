import axios from "axios"
import { BebidasAPIRespuesta, RecetaAPIRespuesta, RespuestaAPICategoriasEsquema } from "../esquemas/recetas-esquemas"
import { Bebida, FiltroBuscador } from "../types"

export async function getCategorias () {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const { data } = await axios(url)
    const resultado = RespuestaAPICategoriasEsquema.safeParse(data)
    if(resultado.success) {
        return resultado.data
    }

}

export async function getRecetas(filtros : FiltroBuscador) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filtros.categoria}&i=${filtros.ingrediente}`
    const { data } = await axios (url)
    const resultado = BebidasAPIRespuesta.safeParse(data)
    if(resultado.success){
        return resultado.data
    }

}

export async function getRecetaPorId (id: Bebida['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const { data } = await axios (url)
    const resultado = RecetaAPIRespuesta.safeParse(data.drinks[0])
    if(resultado.success){
        return resultado.data
    }
}