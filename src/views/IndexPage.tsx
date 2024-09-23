import { useMemo } from "react"
import { useAppStore } from "../stores/UseAppStore"
import CartaBebidas from "../componentes/CartaBebidas"


export default function IndexPage() {

    const bebidas = useAppStore((state) => state.bebidas)

    const hasDrinks = useMemo(() => bebidas.drinks.length > 0  ,[bebidas])

    return (
        <>
        <div className="container mx-auto px-24">
            <h1 className="text-6xl font-extrabold">Recetas</h1>

            {hasDrinks ? (
                
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-3 
                my-10 gap-10">
                    {bebidas.drinks.map((drink) => (
                        <CartaBebidas
                            key={drink.idDrink}
                            drink={drink}
                        />
                    ))}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">
                    No hay resultados aún. Utiliza el formulario para buscar recetas
                </p>
            )}
        </div>
        </>
    )
}
