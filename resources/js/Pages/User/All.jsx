import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TableUsers from "./Partials/Table";
import { FiPlus } from "react-icons/fi";

export default function GetAllUsers({ auth, users }) {
    console.log(users);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Manage Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className="w-full flex justify-end">
                        <Link
                            className="p-2 rounded-full bg-zinc-900 text-white text-sm "
                            href="/users/create"
                        >
                            <FiPlus size={20} />
                        </Link>
                    </div>
                    <TableUsers users={users.data} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
