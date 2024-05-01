import { Link, router } from "@inertiajs/react";
import React from "react";
import { FiBook, FiDownload, FiEdit, FiTrash } from "react-icons/fi";
const TableMaterials = ({ materials, course_id, user }) => {
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
                    {materials.length === 0 && (
                        <tr className="bg-zinc-900/80">
                            <td
                                colSpan={5}
                                className="py-3 px-6 text-center text-white"
                            >
                                Materials is empty..
                            </td>
                        </tr>
                    )}
                    {materials.map((material, index) => (
                        <tr
                            key={material.id}
                            className="bg-zinc-900/80 text-white rounded-md"
                        >
                            <td className="py-3 px-6">{index + 1}.</td>
                            <td className="py-3 px-6">{material.name}</td>

                            <td className="py-3 px-6">
                                {material.role != "admin" && (
                                    <ActionsTableMaterial
                                        course_id={course_id}
                                        material={material}
                                        user={user}
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

export default TableMaterials;

function ActionsTableMaterial({ material, course_id, user }) {
    const handleDelete = () => {
        if (confirm("Are you sure to delete this material?")) {
            router.delete(
                "/courses/" + course_id + "/materials/" + material.id
            );
        }
    };
    return (
        <div className="flex items-center justify-center gap-3">
            <a
                download={true}
                href={material.path}
                className="p-2 bg-green-500/10 text-green-500 rounded-md"
            >
                <FiDownload size={20} />
            </a>
            {user.role != "siswa" && (
                <>
                    {" "}
                    <Link
                        href={
                            "/courses/" +
                            course_id +
                            "/materials/" +
                            material.id
                        }
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
