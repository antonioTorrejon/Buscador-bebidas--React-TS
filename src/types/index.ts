import { z } from 'zod'
import {  BebidaAPIRespuesta, BebidasAPIRespuesta, FiltroBusquedaEsquema, RecetaAPIRespuesta, RespuestaAPICategoriasEsquema } from '../esquemas/recetas-esquemas'

export type Categorias = z.infer<typeof RespuestaAPICategoriasEsquema>
export type FiltroBuscador = z.infer<typeof FiltroBusquedaEsquema>
export type Bebidas = z.infer<typeof BebidasAPIRespuesta>
export type Bebida = z.infer<typeof BebidaAPIRespuesta>
export type Receta = z.infer<typeof RecetaAPIRespuesta>
