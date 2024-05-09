import Popup from "@/Components/Popup";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import {
    FiBook,
    FiEdit,
    FiKey,
    FiLock,
    FiTarget,
    FiTrash,
    FiUnlock,
    FiUsers,
} from "react-icons/fi";
import { MdFeedback, MdQuiz, MdScore } from "react-icons/md";

const TableCourses = ({ courses, user }) => {
    return (
        <div className="overflow-x-scroll">
            <table className="w-full overflow-hidden text-sm text-left text-gray-700 rounded-lg table-auto">
                <thead className="text-sm text-white uppercase bg-zinc-900">
                    <tr>
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">Name</th>
                        {user.role != "siswa" && (
                            <th className="px-6 py-3">Code</th>
                        )}
                        <th className="px-6 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.length === 0 && (
                        <tr className="bg-zinc-900/80">
                            <td
                                colSpan={5}
                                className="px-6 py-3 text-center text-white"
                            >
                                Courses is empty..
                            </td>
                        </tr>
                    )}
                    {courses.map((course, index) => (
                        <tr
                            key={course.id}
                            className="text-white rounded-md bg-zinc-900/80"
                        >
                            <td className="px-6 py-3">{index + 1}.</td>
                            <td className="flex gap-2 px-6 py-3">
                                <p>{course.name}</p>
                                <p className="flex items-center">
                                    {!course.isHaveAccess &&
                                        user.role == "siswa" && <FiLock />}
                                </p>
                            </td>
                            {user.role != "siswa" && (
                                <td className="px-6 py-3">{course.code}</td>
                            )}
                            <td className="px-6 py-3">
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
    const [isOpen, setIsOpen] = useState(false);
    const [key, setKey] = useState("");
    const [err, setErr] = useState("");
    const unlockCourse = async () => {
        if (key.length == 0) return;
        try {
            const response = await fetch(
                route("unlock.course", { code: key, user_id: user.id }),
                {
                    method: "POST",
                }
            ).then((res) => {
                console.log(res);
                return res.json();
            });

            if (response.status) {
                window.location.reload();
            } else {
                setErr("Code not valid");
                setTimeout(() => setErr(""), 3000);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className="flex items-center justify-center gap-3">
            <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
                <p className={`${!err && "hidden"} text-red-400 mb-3`}>{err}</p>
                <div className="flex items-center justify-center gap-3">
                    <TextInput
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="w-full"
                        placeholder="Enter course code"
                    />
                    <PrimaryButton
                        onClick={() => unlockCourse()}
                        className="flex items-center gap-1"
                    >
                        <p>UNLOCK</p>
                        <FiUnlock size={15} />
                    </PrimaryButton>
                </div>
            </Popup>
            {user.role == "admin" && (
                <Link
                    href={"/courses/" + course.id + "/teachers"}
                    className="p-2 text-green-500 rounded-md bg-green-500/10"
                >
                    <FiUsers size={20} />
                </Link>
            )}

            {user.role == "siswa" && course.isHaveAccess ? (
                <>
                    <Link
                        href={"/courses/" + course.id + "/materials"}
                        className="p-2 text-orange-500 rounded-md bg-orange-500/10"
                    >
                        <FiBook size={20} />
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/assignments"}
                        className="p-2 text-indigo-500 rounded-md bg-indigo-500/10"
                    >
                        <FiTarget size={20} />
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/quizzes"}
                        className="p-2 text-indigo-500 rounded-md bg-indigo-500/10"
                    >
                        <MdQuiz size={20} />
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/feedbacks"}
                        className="p-2 rounded-md bg-zinc-500/10 text-zinc-500"
                    >
                        <MdFeedback size={20} />
                    </Link>
                </>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-green-500 rounded-md bg-green-500/10"
                >
                    <FiKey />
                </button>
            )}
            {user.role != "siswa" && (
                <>
                    <Link
                        href={"/courses/" + course.id + "/scores"}
                        className="p-2 text-green-500 rounded-md bg-green-500/10"
                    >
                        <MdScore size={20} />
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/materials"}
                        className="p-2 text-orange-500 rounded-md bg-orange-500/10"
                    >
                        <FiBook size={20} />
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/assignments"}
                        className="p-2 text-indigo-500 rounded-md bg-indigo-500/10"
                    >
                        <FiTarget size={20} />
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/quizzes"}
                        className="p-2 text-indigo-500 rounded-md bg-indigo-500/10"
                    >
                        <MdQuiz size={20} />
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/feedbacks"}
                        className="p-2 rounded-md bg-zinc-500/10 text-zinc-500"
                    >
                        <MdFeedback size={20} />
                    </Link>
                    <Link
                        href={"/courses/" + course.id}
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
                </>
            )}
        </div>
    );
}
