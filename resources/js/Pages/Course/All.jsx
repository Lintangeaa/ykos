import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TableCourses from "./Partials/Table";
import { FiPlus } from "react-icons/fi";

export default function GetAllCourses({ auth, courses }) {
    console.log(courses);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Manage Courses
                </h2>
            }
        >
            <Head title="Courses" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    {auth.user.role != "siswa" && (
                        <div className="w-full flex justify-end">
                            <Link
                                className="p-2 rounded-full bg-zinc-900 text-white text-sm "
                                href="/courses/create"
                            >
                                <FiPlus size={20} />
                            </Link>
                        </div>
                    )}
                    <TableCourses courses={courses} user={auth.user} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
