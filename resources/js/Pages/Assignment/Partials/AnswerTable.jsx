import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { FiBook, FiDownload, FiEdit, FiSave, FiTrash } from "react-icons/fi";

const TableAssignmentAns = ({ answers, user, course_id, assignment_id }) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            score: 0,
        });

    const handleEdit = (index, score) => {
        setEditingIndex(index);
        setData({
            score,
        });
    };

    const handleSave = (ans) => {
        post(
            route("assignmentsans.updatescore", [
                course_id,
                assignment_id,
                ans.id,
            ])
        );
        setEditingIndex(null);
    };

    return (
        <div className="overflow-x-scroll">
            <table className="table-auto w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                <thead className="text-sm text-white uppercase bg-zinc-900">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6">Student</th>
                        <th className="py-3 px-6">File</th>
                        <th className="py-3 px-6 text-center">Score</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {answers.length === 0 && (
                        <tr className="bg-zinc-900/80">
                            <td
                                colSpan={5}
                                className="py-3 px-6 text-center text-white"
                            >
                                Data is empty..
                            </td>
                        </tr>
                    )}
                    {answers.map((ans, index) => (
                        <tr
                            key={ans.id}
                            className="bg-zinc-900/80 text-white rounded-md"
                        >
                            <td className="py-3 px-6">{index + 1}.</td>
                            <td className="py-3 px-6">{ans.user.name}</td>
                            <td className="py-3 px-6">
                                <a href={ans.path} download={true}>
                                    <FiDownload size={20} />
                                </a>
                            </td>
                            <td className="py-3 px-6">
                                {editingIndex === index ? (
                                    <input
                                        type="number"
                                        maxLength={3}
                                        value={data.score}
                                        onChange={(e) =>
                                            setData({
                                                score: e.target.value,
                                            })
                                        }
                                        className="w-24 px-4 py-2 bg-zinc-800 border-none outline-none rounded-md focus:ring-white"
                                    />
                                ) : (
                                    ans.score
                                )}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {editingIndex === index ? (
                                    <button
                                        onClick={() => handleSave(ans)}
                                        className="text-blue-500 focus:outline-none"
                                    >
                                        <FiSave size={20} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleEdit(index, ans.score)
                                        }
                                        className="text-yellow-500 focus:outline-none"
                                    >
                                        <FiEdit size={20} />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableAssignmentAns;
