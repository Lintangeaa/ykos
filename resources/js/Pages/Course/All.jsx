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
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Course yang ada
                </h2>
            }
        >
            <Head title="Courses" />

            <div className="py-12">
                <div className="mx-auto space-y-3 max-w-7xl sm:px-6 lg:px-8">
                    {auth.user.role != "siswa" && (
                        <div className="flex justify-end w-full">
                            <Link
                                className="p-2 text-sm text-black rounded-full bg-zinc-200 "
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
