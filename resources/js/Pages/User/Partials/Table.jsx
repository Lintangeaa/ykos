import { UserRoleBadge } from "@/Pages/Profile/Partials/UpdateProfileInformationForm";
import { Link, router } from "@inertiajs/react";
import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { MdScore } from "react-icons/md";
const TableUsers = ({ users }) => {
    console.log(users);
    return (
        <div className="overflow-x-scroll">
            <table className="table-auto w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                <thead className="text-sm text-white uppercase bg-zinc-900">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6">Email</th>
                        <th className="py-3 px-6">Role</th>
                        <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 && (
                        <tr className="bg-zinc-900/80">
                            <td
                                colSpan={5}
                                className="py-3 px-6 text-center text-white"
                            >
                                Users is empty..
                            </td>
                        </tr>
                    )}
                    {users.map((user, index) => (
                        <tr
                            key={user.id}
                            className="bg-zinc-900/80 text-white rounded-md"
                        >
                            <td className="py-3 px-6">{index + 1}.</td>
                            <td className="py-3 px-6">{user.name}</td>
                            <td className="py-3 px-6">{user.email}</td>
                            <td className="py-3 px-6">
                                <UserRoleBadge role={user.role} />
                            </td>
                            <td className="py-3 px-6">
                                {user.role != "admin" && (
                                    <ActionsTableUser user={user} />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableUsers;

function ActionsTableUser({ user }) {
    const handleDelete = () => {
        if (confirm("Are you sure to delete this user?")) {
            router.delete("/users/" + user.id);
        }
    };
    return (
        <div className="flex items-center gap-3">
            {user.role == "siswa" && (
                <Link
                    href={route("scores.index", user.id)}
                    className="p-2 bg-blue-500/10 text-blue-500 rounded-md"
                >
                    <MdScore size={20} />
                </Link>
            )}
            <Link
                href={"/users/" + user.id}
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
        </div>
    );
}
