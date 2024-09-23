import { useEffect, useMemo, useState, ChangeEvent, FormEvent} from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/UseAppStore"

export default function Header() {
    const [filtroBusquedas, setFiltroBusqueda] = useState({
        ingrediente: '',
        categoria: ''
    })

    const {pathname} = useLocation()
    const isHome = useMemo(() => pathname === '/' , [pathname])

    const fetchCategorias = useAppStore ((state) => state.fetchCategorias )
    const categorias = useAppStore ((state) => state.categorias )
    const buscarRecetas = useAppStore ((state) => state.buscarRecetas )
    const showNotificacion = useAppStore ((state) => state.showNotificacion )


    useEffect(() => {
        fetchCategorias()
    }, [])

    const handleChange = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
        setFiltroBusqueda({
            ...filtroBusquedas,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validacion
        if(Object.values(filtroBusquedas).includes('')) {
            showNotificacion({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        //Consultar las recetas
        buscarRecetas(filtroBusquedas)
    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800' }>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="Imagen logo" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink 
                            to="/"
                            className={({isActive}) => 
                                isActive ? "text-orange-500 uppercase font-bold" 
                                : "text-white uppercase font-bold"
                            }
                        >Inicio</NavLink>
                        <NavLink 
                            to="/favoritos"
                            className={({isActive}) => 
                                isActive ? "text-orange-500 uppercase font-bold" 
                                : "text-white uppercase font-bold"
                            }
                        >Favoritos</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-28 
                        p-10 rounded-lg sahdow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4 ">
                            <label 
                                htmlFor="ingrediente"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Nombre o ingredientes
                            </label>

                            <input 
                                type="text" 
                                id="ingrediente"
                                name="ingrediente"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o ingrediente. Ej. Vodka, Tequila, Café"
                                onChange={handleChange}
                                value={filtroBusquedas.ingrediente}
                            />
                        </div>

                        <div className="space-y-4 ">
                            <label 
                                htmlFor="categoria"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Categoría
                            </label>

                            <select 
                                id="categoria"
                                name="categoria"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={filtroBusquedas.categoria}
                            >
                                <option value="">-- Selecciones --</option>
                                {categorias.drinks.map(categoria => (
                                    <option 
                                        value={categoria.strCategory}
                                        key={categoria.strCategory}
                                    >
                                        {categoria.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input 
                            type="submit" 
                            value="Buscar recetas"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white
                            font-extrabold w-full p-2 rounded-lg uppercase"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
