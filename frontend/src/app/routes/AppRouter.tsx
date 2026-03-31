import { Route, Routes, useLocation } from "react-router-dom"
import MainLayout from "../components/input/MainLayout"
import { LINKS } from "../constants/menu"
import ListCandidate from "../pages/ListCandidate"

export default function AppRouter() {
    const location = useLocation()
    return (

        <Routes location={location} key={location.pathname}>
            <Route element={<MainLayout />}>
                <Route path={LINKS.LIST} element={<ListCandidate />} ></Route>
                {/*<Route path={LINKS.CREATE} element={<Create />} ></Route>*/}
                {/*<Route path={LINKS.VIEW} element={<Dashboard />} ></Route>*/}
            </Route>
        </Routes>
    )
}
