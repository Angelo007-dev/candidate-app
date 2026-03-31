import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow w-full">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
                    <Link
                        to="/"
                        className="font-bold text-lg text-blue-600 hover:text-blue-700 cursor-pointer no-underline"
                    >
                        Candidate Manger
                    </Link>

                    <nav className="flex gap-6">
                        <Link to="/list" className="text-blue-600 hover:underline">
                            List
                        </Link>
                        <Link to="/new-campaign" className="text-blue-600 hover:underline">
                            Créer
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Page container */}
            <main className="max-w-7xl mx-auto p-6">
                <Outlet />
            </main>

        </div>
    );
}