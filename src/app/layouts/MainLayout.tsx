import { Outlet } from "react-router-dom"
import Header from "../../shared/components/Header"
import Footer from "../../shared/components/Footer"

function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout