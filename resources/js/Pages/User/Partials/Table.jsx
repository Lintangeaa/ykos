import { UserRoleBadge } from "@/Pages/Profile/Partials/UpdateProfileInformationForm";
import { Link, router } from "@inertiajs/react";
import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { MdScore } from "react-icons/md";
const TableUsers = ({ users }) => {
    console.log(users);
    return (
        <div className="overflow-x-scroll">
            <table className="w-full overflow-hidden text-sm text-left text-gray-700 rounded-lg table-auto">
                <thead className="text-sm text-black uppercase bg-white">
                    <tr>
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 && (
                        <tr className="bg-white/80">
                            <td
                                colSpan={5}
                                className="px-6 py-3 text-center text-black"
                            >
                                Users is empty..
                            </td>
                        </tr>
                    )}
                    {users.map((user, index) => (
                        <tr
                            key={user.id}
                            className="text-black rounded-md bg-white/80"
                        >
                            <td className="px-6 py-3">{index + 1}.</td>
                            <td className="px-6 py-3">{user.name}</td>
                            <td className="px-6 py-3">{user.email}</td>
                            <td className="px-6 py-3">
                                <UserRoleBadge role={user.role} />
                            </td>
                            <td className="px-6 py-3">
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
                    className="p-2 text-blue-500 rounded-md bg-blue-500/10"
                >
                    <p>SCORE</p>
                </Link>
            )}
            <Link
                href={"/users/" + user.id}
                className="p-2 text-blue-500 rounded-md bg-blue-500/10"
            >
                <FiEdit size={20} />
            </Link>
            <button
                onClick={() => handleDelete()}
                className="p-2 text-red-500 rounded-md bg-red-500/10"
            >
                <FiTrash size={20} />
            </button>
        </div>
    );
}
