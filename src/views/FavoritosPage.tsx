import { useMemo } from "react"
import CartaBebidas from "../componentes/CartaBebidas"
import { useAppStore } from "../stores/UseAppStore"


export default function FavoritosPage() {
    const favoritos = useAppStore ((state) => state.favoritos)
    const hasFavoritos = useMemo (() => favoritos.length , [favoritos])
    return (
        <>
            <h1 className="text-6xl font-extrabold">Favoritos</h1>

            {hasFavoritos ? (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-3 
                my-10 gap-10">
                {favoritos.map(drink => (
                    <CartaBebidas
                        key={drink.idDrink}
                        drink={drink}
                    />
                ))}
            </div>
            ) : (
                <p className="my-10 text-center text-2xl">
                    Los favoritos se mostrarán aquí
                </p>
            )}
        </>
    )
}
