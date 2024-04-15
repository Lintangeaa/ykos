import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TableUsers from "./Partials/Table";
import PrimaryButton from "@/Components/PrimaryButton";

export default function GetAllUsers({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Manage Users
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="w-full flex justify-end">
                        <Link href="/users/create">
                            <PrimaryButton>CREATE</PrimaryButton>
                        </Link>
                    </div>
                    <TableUsers users={users} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
