import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-black text-white">
            <div>
                <Link href="/">
                    <h1 className="text-xl font-bold">E-LEARNING</h1>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-zinc-900 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
