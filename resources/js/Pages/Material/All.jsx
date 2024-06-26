import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TableMaterials from "./Partials/Table";
import { FiPlus } from "react-icons/fi";

export default function GetAllMaterials({ auth, materials, course_id }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Manage Materials
                </h2>
            }
        >
            <Head title="Materials" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    {auth.user.role != "siswa" && (
                        <div className="w-full flex justify-end">
                            <Link
                                className="p-2 rounded-full bg-white text-black text-sm "
                                href={`/courses/${course_id}/materials/create`}
                            >
                                <FiPlus size={20} />
                            </Link>
                        </div>
                    )}
                    <TableMaterials
                        user={auth.user}
                        course_id={course_id}
                        materials={materials.data}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
