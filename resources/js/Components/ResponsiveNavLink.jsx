import { Link } from "@inertiajs/react";

export default function ResponsiveNavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? "border-indigo-400 text-white bg-zinc-800 focus:text-indigo-800 focus:bg-indigo-100 focus:border-white"
                    : "border-transparent text-white/70 hover:text-white hover:bg-zinc-700 hover:border-gray-300 focus:text-white focus:bg-zinc-800 focus:border-zinc-300"
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
