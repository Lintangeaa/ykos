import { Link, router } from "@inertiajs/react";
import React from "react";
import { FiBook, FiEdit, FiTarget, FiTrash } from "react-icons/fi";
import { MdQuiz } from "react-icons/md";
const TableCourses = ({ courses, user }) => {
    return (
        <div className="overflow-x-scroll">
            <table className="table-auto w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                <thead className="text-sm text-white uppercase bg-zinc-900">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.length === 0 && (
                        <tr className="bg-zinc-900/80">
                            <td
                                colSpan={5}
                                className="py-3 px-6 text-center text-white"
                            >
                                Courses is empty..
                            </td>
                        </tr>
                    )}
                    {courses.map((course, index) => (
                        <tr
                            key={course.id}
                            className="bg-zinc-900/80 text-white rounded-md"
                        >
                            <td className="py-3 px-6">{index + 1}.</td>
                            <td className="py-3 px-6">{course.name}</td>

                            <td className="py-3 px-6">
                                {course.role != "admin" && (
                                    <ActionsTableCourse
                                        user={user}
                                        course={course}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableCourses;

function ActionsTableCourse({ course, user }) {
    const handleDelete = () => {
        if (confirm("Are you sure to delete this course?")) {
            router.delete("/courses/" + course.id);
        }
    };
    return (
        <div className="flex items-center justify-center gap-3">
            <Link
                href={"/courses/" + course.id + "/materials"}
                className="p-2 bg-orange-500/10 text-orange-500 rounded-md"
            >
                <FiBook size={20} />
            </Link>
            <Link
                href={"/courses/" + course.id + "/assignments"}
                className="p-2 bg-indigo-500/10 text-indigo-500 rounded-md"
            >
                <FiTarget size={20} />
            </Link>
            <Link
                href={"/courses/" + course.id + "/quizzes"}
                className="p-2 bg-indigo-500/10 text-indigo-500 rounded-md"
            >
                <MdQuiz size={20} />
            </Link>
            {user.role != "siswa" && (
                <>
                    <Link
                        href={"/courses/" + course.id}
                        className="p-2 bg-blue-500/10 text-blue-500 rounded-md"
                    >
                        <FiEdit size={20} />
                    </Link>

                    <button
                        onClick={() => handleDelete()}
                        className="p-2 bg-red-500/10 text-red-500 rounded-md"
                    >
                        <FiTrash size={20} />
                    </button>
                </>
            )}
        </div>
    );
}
