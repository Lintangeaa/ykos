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
import { MdFeedback, MdQuiz } from "react-icons/md";
const TableCourses = ({ courses, user }) => {
    return (
        <div className="overflow-x-scroll">
            <table className="table-auto w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                <thead className="text-sm text-black uppercase bg-white">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6">Name</th>
                        {user.role != "siswa" && (
                            <th className="py-3 px-6">Code</th>
                        )}
                        <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.length === 0 && (
                        <tr className="bg-white/80">
                            <td
                                colSpan={5}
                                className="py-3 px-6 text-center text-black"
                            >
                                Courses is empty..
                            </td>
                        </tr>
                    )}
                    {courses.map((course, index) => (
                        <tr
                            key={course.id}
                            className="bg-white/80 text-black rounded-md"
                        >
                            <td className="py-3 px-6">{index + 1}.</td>
                            <td className="py-3 px-6">
                                <div className="flex gap-2 items-center justify-start">
                                    <p>{course.name}</p>
                                    {!course.isHaveAccess &&
                                        user.role == "siswa" && <FiLock />}
                                </div>
                            </td>
                            {user.role != "siswa" && (
                                <td className="py-3 px-6">{course.code}</td>
                            )}
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
        <div className="flex items-center justify-center gap-3 flex-wrap max-w-1/2">
            <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
                <p className={`${!err && "hidden"} text-red-400 mb-3`}>{err}</p>
                <div className="items-center gap-3 justify-center flex">
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
                    className="p-2 bg-green-500/10 text-green-500 rounded-md"
                >
                    <p>TEACHERS</p>
                </Link>
            )}
            {user.role == "siswa" && course.isHaveAccess ? (
                <>
                    <Link
                        href={"/courses/" + course.id + "/materials"}
                        className="p-2 bg-orange-500/10 text-orange-500 rounded-md"
                    >
                        <p>MATERIALS</p>
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/assignments"}
                        className="p-2 bg-indigo-500/10 text-indigo-500 rounded-md"
                    >
                        <p>ASSIGNMENT</p>
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/quizzes"}
                        className="p-2 bg-indigo-500/10 text-indigo-500 rounded-md"
                    >
                        <p>QUIZ</p>
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/feedbacks"}
                        className="p-2 bg-zinc-500/10 text-zinc-500 rounded-md"
                    >
                        <p>FEEDBACK</p>
                    </Link>
                </>
            ) : (
                user.role == "siswa" &&
                !course.isHaveAccess && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2 rounded-md bg-green-500/10 text-green-500"
                    >
                        <FiKey />
                    </button>
                )
            )}
            {user.role != "siswa" && (
                <>
                    <Link
                        href={"/courses/" + course.id + "/materials"}
                        className="p-2 bg-orange-500/10 text-orange-500 rounded-md"
                    >
                        <p>MATERIALS</p>
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/assignments"}
                        className="p-2 bg-indigo-500/10 text-indigo-500 rounded-md"
                    >
                        <p>ASSIGNMENT</p>
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/quizzes"}
                        className="p-2 bg-indigo-500/10 text-indigo-500 rounded-md"
                    >
                        <p>QUIZ</p>
                    </Link>
                    <Link
                        href={"/courses/" + course.id + "/feedbacks"}
                        className="p-2 bg-zinc-500/10 text-zinc-500 rounded-md"
                    >
                        <p>FEEDBACK</p>
                    </Link>
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
