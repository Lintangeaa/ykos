import { UserRoleBadge } from "@/Pages/Profile/Partials/UpdateProfileInformationForm";
import { Link, router } from "@inertiajs/react";
import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { MdScore } from "react-icons/md";
const TableAssignmentScores = ({ datas }) => {
    return (
        <div className="overflow-x-scroll">
            <div className="px-4 py-2 bg-zinc-100 text-black rounded-t-lg w-fit">
                Assignment
            </div>
            <table className="table-auto w-full text-sm text-left text-gray-700 rounded-b-lg overflow-hidden">
                <thead className="text-sm text-black uppercase bg-white">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6">Course</th>
                        <th className="py-3 px-6">Assignment</th>
                        <th className="py-3 px-6">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.length === 0 && (
                        <tr className="bg-white/80">
                            <td
                                colSpan={5}
                                className="py-3 px-6 text-center text-black"
                            >
                                Data is empty..
                            </td>
                        </tr>
                    )}
                    {datas.map((data, index) => (
                        <tr
                            key={data.id}
                            className="bg-white/80 text-black rounded-md"
                        >
                            <td className="py-3 px-6">{index + 1}.</td>
                            <td className="py-3 px-6">
                                {data.assignment.course.name}
                            </td>
                            <td className="py-3 px-6">
                                {data.assignment.name}
                            </td>
                            <td className="py-3 px-6">{data.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableAssignmentScores;
