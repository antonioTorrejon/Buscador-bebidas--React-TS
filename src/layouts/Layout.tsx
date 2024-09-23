import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Header from "../componentes/Header"
import Modal from "../componentes/Modal"
import { useAppStore } from "../stores/UseAppStore"
import Notificacion from "../componentes/Notificacion"

export default function Layout() {

    const loadFromStorage = useAppStore((state) => (state.loadFromStorage))

    useEffect (() => {
        loadFromStorage()
    }, [])

    return (
        <>
            <Header />

            <main className="container mx-auto py-16">
                <Outlet />
            </main>

            <Modal />
            <Notificacion />
        </>
    )
}
