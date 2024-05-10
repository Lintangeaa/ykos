import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import { FiBook, FiDelete, FiEdit, FiTarget, FiTrash } from "react-icons/fi";
import { MdFeedback, MdQuiz } from "react-icons/md";
const TableTeachers = ({ teachers, course_id }) => {
    return (
        <div className="overflow-x-scroll">
            <table className="table-auto w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                <thead className="text-sm text-black uppercase bg-white">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.length === 0 && (
                        <tr className="bg-white/80">
                            <td
                                colSpan={5}
                                className="py-3 px-6 text-center text-black"
                            >
                                Data is empty..
                            </td>
                        </tr>
                    )}
                    {teachers.map((teacher, index) => (
                        <tr
                            key={teacher.id}
                            className="bg-white/80 text-black rounded-md"
                        >
                            <td className="py-3 px-6">{index + 1}.</td>
                            <td className="py-3 px-6">{teacher.user.name}</td>

                            <td className="py-3 px-6">
                                <ActionsTable
                                    teacher={teacher}
                                    course_id={course_id}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableTeachers;

function ActionsTable({ teacher, course_id }) {
    const handleDelete = async () => {
        if (confirm("Are you sure to unlink this teacher?")) {
            try {
                const response = await fetch(
                    "/api/teachers/" + teacher.id + "/" + course_id,
                    {
                        method: "DELETE",
                    }
                );

                if (!response.ok) {
                    throw new Error(response.status);
                }

                window.location.reload();
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };
    return (
        <div className="flex items-center justify-center gap-3">
            <button
                onClick={handleDelete}
                className="p-2 bg-red-500/10 text-red-500 rounded-md"
            >
                <FiDelete size={20} />
            </button>
        </div>
    );
}

